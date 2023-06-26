export const userService = {
  signup,
  login,
  getUser,
  transferFunds,
  getTransactions,
  logout
}

let user = null

function signup(name) {
  // Create a new user with the given name and starting balance of 100
  user = {
    name,
    balance: 100,
    transactions: []
  }
  saveUser()
}

function login(name) {
  // Check if the user exists in local storage
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    const parsedUser = JSON.parse(savedUser)
    if (parsedUser.name === name) {
      // User exists, retrieve the user details from local storage
      user = parsedUser
    } else {
      // Different user, create a new user with starting balance of 100
      user = {
        name,
        balance: 100,
        transactions: []
      }
      saveUser()
    }
  } else {
    // User does not exist, create a new user with starting balance of 100
    user = {
      name,
      balance: 100,
      transactions: []
    }
    saveUser()
  }
}

function getUser() {
  return user
}

function transferFunds(to, amount) {
  if (user.balance < amount) {
    throw new Error('Insufficient balance')
  }

  const transaction = {
    to,
    amount,
    timestamp: Date.now()
  }

  user.balance -= amount
  user.transactions.push(transaction)
  saveUser()
}

function getTransactions() {
  return user.transactions
}

function saveUser() {
  localStorage.setItem('user', JSON.stringify(user))
}
function logout() {
  user = null
  localStorage.removeItem('user')
}
