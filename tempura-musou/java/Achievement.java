package com.tempura.tempuramusou;

import io.realm.RealmObject;

public class Achievement extends RealmObject {
  private String countryCode;
  private int quizCount;
  private int correctCount;

  public String getCountryCode() {
    return countryCode;
  }

  public void setCountryCode(String countryCode) {
    this.countryCode = countryCode;
  }

  public int getQuizCount() {
    return quizCount;
  }

  public void setQuizCount(int quizCount) {
    this.quizCount = quizCount;
  }

  public int getCorrectCount() {
    return correctCount;
  }

  public void setCorrectCount(int correctCount) {
    this.correctCount = correctCount;
  }
}
