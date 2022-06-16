import { Schema, model } from 'mongoose';
import { Service } from 'typedi';
import { BaseDiary, deleteResult, IDiary, IDiaryModel } from '../interfaces/IDiary';

const DiarySchema = new Schema(
  {
    userId: {
      // type: Schema.Types.ObjectId,
      // ref: 'User',
      type: String,
      required: true,
    },
    diary: {
      type: String,
      required: true,
    },
    feeling: {
      type: String,
      required: true,
    },
    imageFileName: {
      type: String,
      required: false,
    },
    imageFilePath: {
      type: String,
      required: false,
    },
    createdDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const DiaryModel = model<IDiary>('Diary', DiarySchema);

@Service()
export class MongoDiaryModel implements IDiaryModel {
  async create(newDiary: BaseDiary): Promise<IDiary> {
    const newDoc = await DiaryModel.create(newDiary);
    return newDoc.toObject();
  }

  async updateOne(filter: object, toUpdate: BaseDiary): Promise<IDiary> {
    const option = { returnOriginal: false };
    return DiaryModel.findOneAndUpdate(filter, toUpdate, option).lean();
  }

  async deleteOne(id: string): Promise<deleteResult> {
    const result = await DiaryModel.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      return { status: 'Succeess' };
    }
    return { status: 'Fail' };
  }

  async findById(id: string): Promise<IDiary> {
    return DiaryModel.findOne({ _id: id }).lean();
  }

  async findByDate(date: string): Promise<IDiary[]> {
    return DiaryModel.find({ createdDate: date }).sort({ createdAt: -1 }).lean();
  }

  async exists(filter: Object): Promise<Boolean> {
    return DiaryModel.exists(filter).lean();
  }
}