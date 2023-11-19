import { Model, Schema, model } from 'mongoose';

const sequenceSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

class SequenceModel extends Model {}

sequenceSchema.loadClass(SequenceModel);
export default model('sequences', sequenceSchema);