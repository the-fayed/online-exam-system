const userVerificationTemplate = (url) => {
  return `<h1>Email Verification</h1>
    <h3>Welcome to the online exam system!</h3>
    <p> To verify your email please click this link <a href="${url}">verify now</a></p>`;
};

module.exports = userVerificationTemplate;
