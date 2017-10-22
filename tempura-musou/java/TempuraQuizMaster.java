package com.tempura.tempuramusou;

import android.content.Context;
import android.util.Log;

public class TempuraQuizMaster {
  private final int NUM_COUNTRIES_FOR_QUIZ = 4;
  private Context context;
  private int turnCount;
  private int turnCountMax;
  private int setCountMax;
  private int[] countryIndex;
  private int[] usedCountryIndex;
  private String[] countryCodes;
  private Country[] countries;

  TempuraQuizMaster(Context context) {
    this.context = context;
  }

  void start(int turnCountMax, int setCountMax) {
    log("start", "turnCountMax: " + turnCountMax + ", setCountMax: " + setCountMax);

    this.turnCount = 1;
    this.turnCountMax = turnCountMax;
    this.setCountMax = setCountMax;
    this.usedCountryIndex = new int[0];
    this.countryIndex = new int[NUM_COUNTRIES_FOR_QUIZ];
    this.countryCodes = Country.getCodesAll(this.context);
    this.countries = new Country[NUM_COUNTRIES_FOR_QUIZ];

    init();
  }

  void init() {
    log("init", "_");

    this.countryIndex = TempuraUtil.pickRandomUniqueNumbers(
        0, countryCodes.length, NUM_COUNTRIES_FOR_QUIZ, usedCountryIndex
    );

    updateUsedCountryIndex(this.countryIndex);

    for(int i = 0; i < this.countries.length; i++) {
      countries[i] = new Country(this.context, this.countryIndex[i]);
    }

    onInit(this.countries, this.turnCountMax, this.setCountMax);
    next(false);
  }

  void onInit(Country[] countries, int turnCountMax, int setCountMax) {
    String logMessage = "countries: ";
    for(Country country: countries) {
      logMessage += country.getCode() + ", ";
    }
    log("onInit", logMessage);
  }

  void onTurn(int turnCount, String quiz, int answer) {
    log("onTurn", "turnCount: " + turnCount + ", quiz: " + quiz + ", answer: " + answer);
  }

  void onFinish() {
    log("onFinish", "_");
  }

  void next(boolean needIncrement) {
    log("next", "_");

    Country targetCountry = this.countries[(int) (Math.random() * this.countries.length)];
    String quiz = targetCountry.getQuiz();
    int answer = targetCountry.getId();

    if(this.turnCount == this.turnCountMax * this.setCountMax) {
      this.onFinish();
    }
    else if(this.turnCount > 0 && this.turnCount % this.turnCountMax == 0) {
      if(needIncrement) {
        this.turnCount++;
      }

      this.init();
    }
    else {
      if(needIncrement) {
        this.turnCount++;
      }

      onTurn(this.turnCount, quiz, answer);
    }
  }

  void next() {
    next(true);
  }

  private void updateUsedCountryIndex(int[] usedCountryIndexDiff) {
    int[] newUsedCountryIndex = new int[this.usedCountryIndex.length + usedCountryIndexDiff.length];

    for(int i = 0; i < this.usedCountryIndex.length; i++) {
      newUsedCountryIndex[i] = this.usedCountryIndex[i];
    }

    for(int i = 0; i < usedCountryIndexDiff.length; i++) {
      newUsedCountryIndex[this.usedCountryIndex.length + i] = usedCountryIndexDiff[i];
    }

    this.usedCountryIndex = newUsedCountryIndex;
  }

  private void log(String tag, String message) {
    Log.d("TempuraQuizMaster", "[" + tag + "] " + message);
  }
}
