const selectSelf = "//span[contains(text(), 'For self')]";
const selectFamily = "//span[contains(text(), 'Your family')]";
const selectParents = "//span[contains(text(), 'Your parents')]";
const optimaRestoreOption = "text=Optima Restore";
const optimaSecureOption = "text=Optima Secure";
const selectFather = "//span[contains(text(), 'Father')]";
const selectMother = "//span[contains(text(), 'Mother')]";
const ageInputIndividual = "#text-input-age";
const fathersAgeInput = "#text-input-fathersAge";
const fatherAgeInputHelperText = "#text-input-fathersAge-helper-text";
const motherAgeInputHelperText = "#text-input-mothersAge-helper-text";
const mothersAgeInput = "#text-input-mothersAge";
const pincodeInputIndividual = "#text-input-pincode";
const fullNameTextInput = "#text-input-fullName";
const mobileNumberTextInput = "#text-input-mobile";
const otpInput = "#text-input-otp";
const otpSubmit = "//span[contains(text(), 'Submit')]";
const continueButton = "text=Continue";
const continueButton2 = "//button//span[contains(text(), 'Continue')]";
const heading = "h4";
const calculatePremiumButton = "text=Calculate Premium";
const ageIsRequiredText = "#text-input-age-helper-text";
const fatherAgeIsRequiredText = "#text-input-fathersAge-helper-text";
const motherAgeIsRequiredText = "#text-input-mothersAge-helper-text";
const pincodeIsRequired = "#text-input-pincode-helper-text";
const defaultCoverAmount = "//span[contains(text(),'₹')]";
const coverAmountListXpath = "//div[contains(text(), '₹')]";
const oneYearPremiumXpath =
	"(//p[contains(text(),'Premium')]//span[contains(text(), '₹')])[1]";
const twoYearPremiumXpath =
	"(//p[contains(text(),'Premium')]//span[contains(text(), '₹')])[2]";
const firstSummaryCardPremiumXpath =
	"(//span[contains(text(), '/ 1 year')])/../../p/span[contains(text(),'₹')]";
const totalPremiumXpath =
	"//p[contains(text(), 'Total premium')]/../../div/p[contains(text(), '₹')]";
const riderXpath = (rider) => {
	return `(//p[contains(text(), '${rider}')]/../../div//span)[2]`;
};
const buyThisButton = "//button//span[contains(text(),'Buy This')]";
const popUpPremiumXpath =
	"(//div[@class='MuiGrid-root MuiGrid-container']//div//p[contains(text(), 'Premium')]/..//span[contains(text(), '₹')])[2]";
const confirmAndBuyButton =
	"//button//span[contains(text(),'Confirm and buy')]";
const dontWorrySpamMsg =
	"//span[contains(text(), 'Don’t worry, we will never spam you')]";
const sendOtpButton = "//button//span[contains(text(),'Send')]";
const inputOTP = "#text-input-otp";
const otpIsRequired = "//p[contains(text(), 'otp is a required field')]";
const secondSummaryPremiumXpath =
	"//span[contains(text(), '/ 1 year')]/..//span[contains(text(), '₹')]";
const heading_h4 = "//h4";
const startButtonForKYC = "//button//span[contains(text(), 'Start')]";
const inputPan = "#text-input-pan";
const dobInputForKYC = "#date-picker-dialog-dob";
const dobErrorMessage = "#date-picker-dialog-dob-helper-text";
const fetchKYCDetailsButton = "//span[contains(text(), 'Fetch')]";
const NoButtonInConfirmKYCDetails = "//button//span[contains(text(), 'No')]";
const YesButtonInConfirmKYCDetails = "//button//span[contains(text(), 'Yes,')]";
const resumeButton = "//button//span[contains(text(), 'Resume')]";
const selectGender = "#select-gender";
const selectMale = "//li[contains(text(), 'Male')]";
const selectFemale = "//li[contains(text(), 'Female')]";
const selectMaritalStatus = "#select-marital_status";
const selectSingle = "//li[contains(text(), 'Single')]";
const inputEmailIdInProposalForm = "#text-input-email_id";
const selectAreaName = "//div[@id='select-address.area_name']";
const nextButtonInProposalForm = "//button//span[contains(text(), 'Next')]";
const selectHeight = "//div[contains(text(),'Height')]";
const listElementsFromDropDown = "//ul[@role='listbox']/li";
const weightHelperTextXpath =
	'//p[@id="text-input-insured_basic[0].weight-helper-text"]';
const weightInputField = '//input[@id="text-input-insured_basic[0].weight"]';
const yourPremiumHasBeenUpdatedText =
	"//p[contains(text(), 'Your premium amount might change since pincode changed in the application form. You can continue to see the updated premium.')]";
const okayButton = "//button//span[contains(text(), 'Okay')]";
const heightInputButton = "(//div[contains(text(),'Height')])[1]";
// const nextButton = "//button//span[contains(text(), 'Next')]";\
const h6ChangeInPremiums = "//h6[contains(text(), 'Change in premiums')]";
const NoneToAllInputCheckbox = "//input[@name='NoneToAll']";
const h6NomineeHeading = "//h6[contains(text(), 'Nominee for this policy')]";
const nomineeNameInput = "//input[@placeholder='John Doe']";
const selectNomineeRelation = "//div[@id='select-nominee.relation']";
const nomineeAgeInput = "//input[@id='text-input-nominee.age']";
const fullNameHelperText = "#text-input-full_name-helper-text";
const inputFullName = "#text-input-full_name";
const emailIDHelperText = "#text-input-email_id-helper-text";
const genderHelperText = "//label[contains(text(), 'Gender')]/../..//div/p";
const maritalStatusHelperText =
	"//label[contains(text(), 'Marital')]/../..//div/p";

const kycPopUpCloseButton =
	"//div[@role='dialog']//button//span[@class='MuiIconButton-label']";
export {
	genderHelperText,
	maritalStatusHelperText,
	kycPopUpCloseButton,
	coverAmountListXpath,
	fatherAgeInputHelperText,
	motherAgeInputHelperText,
	fullNameHelperText,
	inputFullName,
	emailIDHelperText,
	nomineeAgeInput,
	selectNomineeRelation,
	nomineeNameInput,
	h6NomineeHeading,
	NoneToAllInputCheckbox,
	h6ChangeInPremiums,
	listElementsFromDropDown,
	selectHeight,
	nextButtonInProposalForm,
	selectAreaName,
	inputEmailIdInProposalForm,
	selectSingle,
	selectMaritalStatus,
	selectMale,
	selectFemale,
	selectGender,
	resumeButton,
	startButtonForKYC,
	heading_h4,
	inputPan,
	dobInputForKYC,
	dobErrorMessage,
	fetchKYCDetailsButton,
	NoButtonInConfirmKYCDetails,
	YesButtonInConfirmKYCDetails,
	selectFamily,
	selectParents,
	selectFather,
	selectMother,
	continueButton,
	continueButton2,
	heading,
	calculatePremiumButton,
	ageIsRequiredText,
	fatherAgeIsRequiredText,
	motherAgeIsRequiredText,
	pincodeIsRequired,
	defaultCoverAmount,
	oneYearPremiumXpath,
	twoYearPremiumXpath,
	firstSummaryCardPremiumXpath,
	totalPremiumXpath,
	riderXpath,
	buyThisButton,
	popUpPremiumXpath,
	confirmAndBuyButton,
	dontWorrySpamMsg,
	sendOtpButton,
	inputOTP,
	otpIsRequired,
	secondSummaryPremiumXpath,
	selectSelf,
	optimaRestoreOption,
	ageInputIndividual,
	pincodeInputIndividual,
	otpInput,
	otpSubmit,
	fullNameTextInput,
	mobileNumberTextInput,
	optimaSecureOption,
	fathersAgeInput,
	mothersAgeInput,
	weightInputField,
	weightHelperTextXpath,
	yourPremiumHasBeenUpdatedText,
	okayButton,
	heightInputButton,
};
