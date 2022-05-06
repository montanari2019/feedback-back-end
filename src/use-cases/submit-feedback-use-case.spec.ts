import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();


const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendEmailSpy }
);

describe("Submit Feedback", () => {

  it("should be ale to subimit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "This feedback",
        screenshot: "data:image/png;base64/496d87v4sd64g6s5d41",
      })
    ).resolves.not.toThrow();

      expect(createFeedbackSpy).toHaveBeenCalled()
      expect(sendEmailSpy).toHaveBeenCalled()


  });

  it("should not be ale to subimit a feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "This feedback",
        screenshot: "data:image/png;base64/496d87v4sd64g6s5d41",
      })
    ).rejects.toThrow();
  });

  it("should not be ale to subimit a feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64/496d87v4sd64g6s5d41",
      })
    ).rejects.toThrow();
  });

  it("should not be ale to subimit a feedback with an invalid screenshot", async () => {
    await expect(submitFeedback.execute({
        type: "BUG",
        comment: "this feedback is invalid",
        screenshot: "data.jpg",
      })
    ).rejects.toThrow();
  });

  
});
