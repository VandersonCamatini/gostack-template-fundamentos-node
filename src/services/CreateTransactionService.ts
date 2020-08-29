import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestTDO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestTDO): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw Error(
        'The informed type is invalid. Expected is incorme or outcome.',
      );
    }

    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw Error('You do not have enough balance.');
    }
    const createdTransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return createdTransaction;
  }
}

export default CreateTransactionService;
