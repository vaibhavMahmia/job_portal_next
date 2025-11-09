import crypto from 'crypto';
import { getIPAddress } from './location';
import { cookies, headers } from 'next/headers';
import { db } from '@/config/db';
import { sessions, users } from '@/drizzle/schema';
import { SESSION_LIFETIME, SESSION_REFRESH_RATE } from '@/config/constant';
import { eq } from 'drizzle-orm';

type DbClient = typeof db | Parameters<Parameters<typeof db.transaction>[0]>[0];

type CreateSessionData = {
    userAgent: string;
    ip: string;
    userId: number;
    token: string;
    tx?: DbClient;
};

const generateSessionToken = () => crypto.randomBytes(32).toString('hex').normalize();

const createUserSession = async ({ token, userId, userAgent, ip, tx = db }: CreateSessionData) => {
    const hashedToken = crypto.createHash('sha-256').update(token).digest('hex');
    const [session] = await tx.insert(sessions).values({
        id: hashedToken,
        userId,
        expiresAt: new Date(Date.now() + SESSION_LIFETIME * 1000),
        ip,
        userAgent,
    });

    return session;
}

export const createSessionAndSetCookies = async (userId: number, tx: DbClient = db) => {
    const token = generateSessionToken();
    const ip = await getIPAddress();
    const headersList = await headers();
    await createUserSession({ token, userId, userAgent: headersList.get('user-agent') || '', ip, tx });
    const cookieStore = await cookies();
    cookieStore.set('session', token, { secure: true, httpOnly: true, maxAge: SESSION_LIFETIME });
}

export const invalidateSession =  async (id: string) => await db.delete(sessions).where(eq(sessions.id, id));

export const validateSessionAndGetUser = async (session: string) => {
    const hashedToken = crypto.createHash('sha-256').update(session).digest('hex');
    const [user] = await db.select({
        id:users.id,
        session: {
            id: sessions.id,
            expiresAt: sessions.expiresAt,
            userAgent: sessions.userAgent,
            ip: sessions.ip
        },
        name: users.name,
        userName: users.userName,
        role: users.role,
        phoneNumber: users.phoneNumber,
        email: users.email,
        crestedAt: users.createdAt,
        updatedAt: users.updatedAt
    }).from(sessions).where(eq(sessions.id, hashedToken)).innerJoin(users, eq(users.id, sessions.userId));

    if(!user) return null;

    if(Date.now() >= user.session.expiresAt.getTime()){
        await invalidateSession(user.session.id);
        return null;
    }

    if(Date.now() >= user.session.expiresAt.getTime() - SESSION_REFRESH_RATE * 1000)
        await db.update(sessions).set({ expiresAt: new Date(Date.now() + SESSION_LIFETIME * 1000) }).where(eq(sessions.id, user.session.id));

    return user;
}

