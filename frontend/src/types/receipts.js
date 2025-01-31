export const ReceiptTypes = ['parking', 'ev-charging', 'printing', 'canteen'];
export const ReceiptStatuses = ['pending', 'completed', 'cancelled'];

export const createReceipt = (id, type, confirmationCode, date, amount, status, details = {}) => {
  if (!ReceiptTypes.includes(type)) {
    throw new Error(`Invalid receipt type: ${type}`);
  }
  if (!ReceiptStatuses.includes(status)) {
    throw new Error(`Invalid receipt status: ${status}`);
  }

  return {
    id,
    type,
    confirmationCode,
    date,
    amount,
    status,
    details,
  };
};
