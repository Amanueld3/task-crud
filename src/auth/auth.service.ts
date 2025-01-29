import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto } from './dto/auth.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService, // Inject PrismaService
  ) {}

  async validateUser({ username, password }: AuthPayloadDto) {
    // Query the database for the user by username
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (!user) return null;

    // Assume the password is hashed, compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashedPassword: userPassword, ...result } = user;
    return this.jwtService.sign(result); // Sign the JWT without the password
  }
}
