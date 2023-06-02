import e from 'express';
import userDatabase from '../data-access/userDatabase';
import { User } from './user';
import { Lecturer as LecturerPrisma, User as UserPrisma } from '@prisma/client';
import exp from 'constants';
import userService from '../../service/userService';

export class Lecturer {
    readonly id?: number;
    readonly user: User;
    readonly expertise: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(lecturer: {
        id?: number;
        user: User;
        expertise: string;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.id = lecturer.id;
        this.user = lecturer.user;
        this.expertise = lecturer.expertise;
        this.createdAt = lecturer.createdAt;
        this.updatedAt = lecturer.updatedAt;
    }

    equals({ id, user, expertise, createdAt, updatedAt }): boolean {
        return (
            this.id === id &&
            this.user.equals(user) &&
            this.expertise === expertise &&
            this.createdAt === createdAt &&
            this.updatedAt === updatedAt
        );
    }




    static from({
        id,
        user,
        expertise,
        createdAt,
        updatedAt,
    }: LecturerPrisma & { user: UserPrisma }) {
        return new Lecturer({
            id,
            user: User.from(user),
            expertise,
            createdAt,
            updatedAt,
        });
    }
}
