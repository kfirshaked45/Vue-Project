export const userService = {
  signup,
  login,
  getUser,
  transferFunds,
  getTransactions,
  logout,
  updateUserProfile
}

let users = []

function signup(name) {
  // Check if the user already exists
  const existingUser = users.find((user) => user.name === name)
  if (existingUser) {
    throw new Error('User already exists')
  }

  // Create a new user with the given name and starting balance of 100
  const newUser = {
    name,
    balance: 100,
    transactions: []
  }

  // Add the new user to the users array
  users.push(newUser)
  saveUsers()
}

function login(name) {
  // Check if the user exists in the users array
  const user = users.find((user) => user.name === name)
  if (!user) {
    throw new Error('User does not exist')
  }

  // Set the user as the active user
  setCurrentUser(user)
}

function getUser() {
  return getCurrentUser()
}

function transferFunds(to, amount) {
  const currentUser = getCurrentUser()

  if (currentUser.balance < amount) {
    throw new Error('Insufficient balance')
  }

  const transaction = {
    to,
    amount,
    timestamp: Date.now()
  }

  currentUser.balance -= amount
  currentUser.transactions.push(transaction)
  saveUsers()
}

function getTransactions() {
  const currentUser = getCurrentUser()
  return currentUser.transactions
}

function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users))
}

function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user))
}

function getCurrentUser() {
  const currentUser = localStorage.getItem('currentUser')
  return currentUser ? JSON.parse(currentUser) : null
}

function logout() {
  localStorage.removeItem('currentUser')
}

function updateUserProfile(updatedProfile) {
  const currentUser = getCurrentUser()
  if (currentUser) {
    // Update the user profile
    currentUser.name = updatedProfile.name
    saveUsers()
    setCurrentUser(currentUser)
  }
}
