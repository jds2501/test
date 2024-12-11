let accounts = [
	{ id: 1, owner: "Alice", balance: 500 },
	{ id: 2, owner: "Bob", balance: 300 }
];

function validateAccountIdType(accountId) {
	if (typeof accountId !== 'number' || !accountId) {
		throw new Error("accountId must be a number and exist");
	}
}

function validateOwnerType(owner) {
	if (typeof owner !== 'string' || !owner) {
		throw new Error('owner must be a string and exist');
	}
}

function validateAmount(amount) {
	if (typeof amount !== 'number' || !amount || amount < 0) {
		throw Error('amount must be a number and be greater than zero');
	} else if (!Number.isFinite(amount)) {
		throw new Error("Invalid value for amount: The amount must be a finite number.");
	}
}

function getAccountById(id) {
	validateAccountIdType(id);

	for (let i = 0; i < accounts.length; i++) {
		if (accounts[i].id === id) {
			return accounts[i];
		}
	}
}

function getAccountByIdIfIdExists(id) {
	let account = getAccountById(id);

	if (!account) {
		throw new Error("Account not found");
	}

	return account;
}

function createAccount(newAccountId, newAccountOwner) {
	validateAccountIdType(newAccountId);
	validateOwnerType(newAccountOwner);

	if (newAccountId <= 0 || newAccountOwner.trim().length === 0 || getAccountById(newAccountId)) {
		throw new Error("createAccount: Invalid parameters");
	}

	accounts.push(
		{
			id: newAccountId,
			owner: newAccountOwner,
			balance: 0
		}
	);
}

function depositMoney(accountId, amount) {
	validateAmount(amount);
	const account = getAccountByIdIfIdExists(accountId);
	account.balance += amount;
}

function validateSufficientFunds(amount, balance) {
	if (amount > balance) {
		throw new Error("Insufficient funds");
	}
}

function withdrawMoney(accountId, amount) {
	validateAmount(amount);

	const account = getAccountByIdIfIdExists(accountId);
	validateSufficientFunds(amount, account.balance);

	account.balance -= amount;
}

function transferMoney(fromAccountId, toAccountId, amount) {
	validateAmount(amount);
	const fromAccount = getAccountByIdIfIdExists(fromAccountId);
	validateSufficientFunds(amount, fromAccount.balance);
	const toAccount = getAccountByIdIfIdExists(toAccountId);

	fromAccount.balance -= amount;
	toAccount.balance += amount;
}

try {
	getAccountById("1");
} catch (err) {
	console.log(err);
}


try {
	createAccount(1, "Alice");
} catch (err) {
	console.log(err);
}


try {
	createAccount("3", "Charlie");
} catch (err) {
	console.log(err);
}

try {
	createAccount(-3, "Charlie");
} catch (err) {
	console.log(err);
}

try {
	createAccount(3, ["Charlie"]);
} catch (err) {
	console.log(err);
}

try {
	createAccount(3, "");
} catch (err) {
	console.log(err);
}

try {
	createAccount(3, "  ");
} catch (err) {
	console.log(err);
}

try {
	depositMoney(1, "300");
} catch (err) {
	console.log(err);
}

try {
	depositMoney(1, -300);
} catch (err) {
	console.log(err);
}

try {
	depositMoney(1, 0);
} catch (err) {
	console.log(err);
}

try {
	depositMoney(1, Infinity);
} catch (err) {
	console.log(err);
}

try {
	depositMoney(4, 100);
} catch (err) {
	console.log(err);
}

try {
	withdrawMoney(1, -100);
} catch (err) {
	console.log(err);
}

try {
	withdrawMoney(1, 0);
} catch (err) {
	console.log(err);
}

try {
	withdrawMoney(1, 501);
} catch (err) {
	console.log(err);
}

try {
	transferMoney(1, 4, 100);
} catch (err) {
	console.log(err);
}

try {
	transferMoney(1, 2, 501);
} catch (err) {
	console.log(err);
}

try {
	transferMoney(1, 2, 100);
} catch (err) {
	console.log(err);
}
