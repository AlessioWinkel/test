import e from 'express';
import userDatabase from '../data-access/userDatabase';
import { Lecturer as LecturerPrisma, User as UserPrisma } from '@prisma/client';
import exp from 'constants';
import userService from '../../service/userService';
import usermapper from './usermapper';
import { Lecturer } from '../model/lecturer';
import userMapper from './usermapper';




  const mapToLecturers = ( lecturerPrisma: LecturerPrisma[]): Lecturer[] =>
  lecturerPrisma.map(Lecturer.from)


export default (mapToLecturers)