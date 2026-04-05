import {Schema, model} from 'mongoose';
import { userRoles } from '../utils/userRoles';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, 'userName is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        //  use validation library here for format
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: [8, 'password must be at least 8 characters'],
        select: false,
    },
    role: {
        type: String,
        enum: [userRoles.ADMIN, userRoles.USER],
        default: userRoles.USER,
    }
})

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = model('User', userSchema);

export default User;