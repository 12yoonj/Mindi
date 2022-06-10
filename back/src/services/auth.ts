import { Service } from "typedi";
import { StatusError } from "../utils/error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import config from "../config";
import { MongoUserModel, TestUserModel } from "../interfaces/IUserModel";

@Service()
export default class AuthService {
  constructor(
    private userModel: MongoUserModel
    // private userModel: TestUserModel
  ) {
  }

  public async localSignUp(email: string, name: string, password: string) {
    const emailExists = await this.userModel.exists({ email: email });

    if (emailExists) {
      throw new StatusError(
        400,
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      );
    }

    // 비밀번호 해시화
    const hashedPassword: string = await bcrypt.hash(password, 10);

    return this.userModel.create(
      email,
      name,
      hashedPassword
    );
  }

  public async localSignIn(email: string, password: string) {
    const emailExists = await this.userModel.exists({ email: email });

    if (!emailExists) {
      throw new StatusError(
        400,
        "이메일 혹은 비밀번호가 일치하지 않습니다."
      );
    }

    const user = await this.userModel.findOne({ email: email });

    const correctPasswordHash = user!.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new StatusError(
        400,
        "이메일 혹은 비밀번호가 일치하지 않습니다."
      );
    }

    const date: string = dayjs().toISOString();

    await this.userModel.update(
      { _id: user!._id },
      { recentLogin: date },
    );

    const jwt = this.issueJWT(user);

    return {
      ...user,
      token: jwt.token,
      expiresIn: jwt.expires
    };
  }

  public async googleSignIn() {
    // TODO
    // 구글 로그인
  }

  public issueJWT(user: any) {
    const _id = user._id;
    const expiresIn: string = config.jwtExpirationDate;
    const date: number = dayjs().unix();

    const payload = {
      _id: _id,
      iat: date
    }

    const secretKey: string = config.jwtSecretKey!;
    const signedToken = jwt.sign(payload, secretKey, { expiresIn: expiresIn });

    return {
      token: "Bearer " + signedToken,
      expires: expiresIn
    };
  }
}