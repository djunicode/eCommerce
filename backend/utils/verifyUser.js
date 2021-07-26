const loggedin = (req) => {
  if (req.user) {
    return true;
  } else {
    throw new Error('Not authorized');
  }
};

const admin = (req) => {
  console.log(req.user);
  if (req.user && req.user.isAdmin) {
    return true;
  } else {
    throw new Error('Not authorized as an admin');
  }
};

export { loggedin, admin };
