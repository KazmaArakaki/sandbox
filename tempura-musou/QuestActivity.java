package com.tempura.tempuramusou;

import android.content.Context;
import android.content.res.TypedArray;
import android.util.Log;

public class TempuraQuizMaster {
  private final int NUM_CHOICES = 4;
  private Context context;
  private String[] countryCodes;
  private int turnCount;
  private int turnCountMax;
  private Country[] countries;

  TempuraQuizMaster(Context context) {
    this.context = context;
    countryCodes = context.getResources().getStringArray(R.array.country_codes);
    countries = new Country[NUM_CHOICES];
  }

  void init() {
    Log.d("init", "_");

    this.turnCount = 0;
    int[] randomNumbers = TempuraUtil.getRandomNumbers(NUM_CHOICES, 0, countryCodes.length - 1, true);

    for(int i = 0; i < NUM_CHOICES; i++) {
      countries[i] = new Country();
      countries[i].id = randomNumbers[i];
    };

    this.onInit(this.countries);
    next();
  }

  void next() {
    Log.d("next", "_");

    this.turnCount++;
    Country nextCountry = countries[(int) (Math.random() * countries.length)];

    if(this.turnCount <= this.turnCountMax) {
      this.onTurn(turnCount, nextCountry.getQuiz(), nextCountry.getId());
    }
    else {
      this.onFinish();
    }
  }

  void onFinish() {
    Log.d("onFinish", "_");
  }

  void onInit(Country[] countries) {
    String countriesListStr = "";
    for(Country country: countries) {
      countriesListStr += country.getCode() + ", ";
    }

    Log.d("onInit", "countries: " + countriesListStr);
  }

  void onTurn(int turnCount, String quiz, int answer) {
    Log.d("onTurn", "turnCount: " + turnCount + ", quiz: " + quiz + ", answer: " + answer);
  }

  void start(int turnCountMax) {
    Log.d("start", "turnCountMax: " + turnCountMax);

    this.turnCountMax = turnCountMax;

    this.init();
  }

  class Country {
    private int id;

    void setId(int id) {
      this.id = id;
    }

    int getId() {
      return this.id;
    }

    String getCode() {
      return countryCodes[this.id];
    }

    int getImageResourceId() {
      int resId = context.getResources().getIdentifier(
          "images_" + this.getCode(),
          "array",
          context.getPackageName()
      );

      return context.getResources().obtainTypedArray(resId).getResourceId(0, 0);
    }

    String getQuiz() {
      int resId = context.getResources().getIdentifier(
          "quizzes_" + this.getCode(),
          "array",
          context.getPackageName()
      );

      String[] quizzes = context.getResources().getStringArray(resId);

      return quizzes[(int) (Math.random() * quizzes.length)];
    }
  }
}
