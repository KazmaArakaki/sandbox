package com.tempura.tempuramusou;

import android.content.Context;

public class Country {
  private Context context;
  private int id;

  Country(Context context, int id) {
    this.context = context;
    this.id = id;
  }

  static String[] getCodesAll(Context context) {
    return context.getResources().getStringArray(R.array.country_codes);
  }

  static String getNameByCode(Context context, String code) {
    int resId = context.getResources().getIdentifier(
        "country_name_" + code,
        "string",
        context.getPackageName()
    );

    return context.getResources().getString(resId);
  }

  static int getImageResourceIdByCode(Context context, String code) {
    int resId = context.getResources().getIdentifier(
        "images_" + code,
        "array",
        context.getPackageName()
    );

    return context.getResources().obtainTypedArray(resId).getResourceId(0, 0);
  }

  static String[] getQuizzesByCode(Context context, String code) {
    int resId = context.getResources().getIdentifier(
        "quizzes_" + code,
        "array",
        context.getPackageName()
    );

    return context.getResources().getStringArray(resId);
  }

  int getId() {
    return this.id;
  }

  String getCode() {
    return Country.getCodesAll(this.context)[this.getId()];
  }

  String getName() {
    return Country.getNameByCode(this.context, this.getCode());
  }

  int getImageResourceId() {
    return Country.getImageResourceIdByCode(this.context, this.getCode());
  }

  String getQuiz() {
    String[] quizzes = Country.getQuizzesByCode(this.context, this.getCode());

    return quizzes[(int) (Math.random() * quizzes.length)];
  }
}
