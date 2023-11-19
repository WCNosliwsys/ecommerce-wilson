import SequenceModel from '../sequences/sequenceModel';

export async function getNextCode(sequenceName) {
  const sequence = await SequenceModel.findOneAndUpdate(
    { name: sequenceName },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  return sequence.value;
}