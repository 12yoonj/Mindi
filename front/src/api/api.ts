import {
  customAxios,
  customAxiosFileUpload,
  customAxiosForAi,
} from 'api/costomAxios';
import { SignUpInfo, SignInInfo, diary } from 'types/apiType';

export const signUpPost = async (userInfo: SignUpInfo) => {
  const apiUrl = `api/auth/local/sign-up`;
  await customAxios.post(apiUrl, userInfo);
};

export const signInPost = async (userInfo: SignInInfo) => {
  const apiUrl = `api/auth/local/sign-in`;
  const { data } = await customAxios.post(apiUrl, userInfo);
  return data.result;
};

export const getCurUser = async () => {
  const apiUrl = `api/users`;
  const { data } = await customAxios.get(apiUrl);
  return data.result;
};

export const postDiaryPosting = async (diaryData: any) => {
  const apiUrl = `api/diaries`;
  await customAxiosFileUpload.post(apiUrl, diaryData);
};

export const postAnalysis = async (diary: diary) => {
  const apiUrl = `diaries/sentiment`;
  const { data } = await customAxiosForAi.post(apiUrl, diary);
  return data.result;
};
export const getDiaryList = async (date: any) => {
  const apiUrl = `api/diaries?date=${date}`;
  const { data } = await customAxios.get(apiUrl);
  return data.result;
};
