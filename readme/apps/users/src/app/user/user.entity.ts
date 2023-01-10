import { UserInterface, UserRole } from '@readme/shared-types';
import { genSalt, hash, compare } from 'bcrypt';
import { SALT_ROUNDS } from './user.constant';

export class UserEntity implements UserInterface {
  public _id: string;
  public dateRegistration: Date;
  public email: string;
  public firstname: string;
  public lastname: string;
  public avatar: string;
  public passwordHash: string;
  public role: UserRole;
  public subscribersId: string[]

  constructor(user: UserInterface) {
    this.fillEntity(user);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(user: UserInterface) {
    this._id = user._id;
    this.dateRegistration = user.dateRegistration;
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.avatar = user.avatar;
    this.passwordHash = user.passwordHash;
    this.role = user.role;
    this.subscribersId = user.subscribersId;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
