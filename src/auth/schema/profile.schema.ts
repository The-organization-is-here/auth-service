import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {

    @Prop({required : true})
    firstName: string;

    @Prop({required : true})
    lastName: string;

    @Prop({required : true})
    email: string;

    @Prop({required : true})
    password: string;

    @Prop()
    description: string;

    @Prop()
    tags: string[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
