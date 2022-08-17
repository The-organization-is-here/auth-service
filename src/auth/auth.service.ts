import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Profile, ProfileDocument } from './schema/profile.schema';
import { JwtService } from '@nestjs/jwt';
import { Credentials } from './schema/dto/credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
                private jwtService: JwtService) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const profile = await this.profileModel.findOne({email: email})
        if(!profile) return null;
        const isMatch = await bcrypt.compare(pass, profile.password);
        if (isMatch) {
            const { password, ...result } = profile;
            return result;
        }
        return null;
    }

    async login(user: Credentials) {
        if(this.validateUser(user.email, user.password)) {
            const payload = { username: user.email, sub: user.password };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        return null;
    }
}
