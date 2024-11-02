const truncateName = (text, maxLength) => {
  if (text.length > 0) {
    return text.slice(0, maxLength) + "...";
  }
};

export default truncateName;
