import mongoose, { Document, Schema } from 'mongoose';

export interface ILessonDocument extends Document {
    order: number;
    title: string;
    video: string;
    poster: string,
    url: string;
    price: string;
    category: string;
    _doc: ILessonDocument;
};
const LessonSchema: Schema<ILessonDocument> = new Schema({
    order: Number,
    title: String,
    video: String,
    poster: String,  
    url: String,
    price: String,
    category: String,
}, {
    timestamps: true,
});

export const Lesson = mongoose.model('Lesson', LessonSchema);