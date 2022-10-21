export const CheckSession = (sessionName) => {
  if (localStorage.getItem(`${sessionName}`) !== null) {
    const value = localStorage.getItem(`${sessionName}`);
    return value;
  } else {
    return false;
  }
};

export const ClearSession = (sessionName) => {
  if (localStorage.getItem(`${sessionName}`) !== null) {
    localStorage.removeItem(`${sessionName}`);
  }
};
