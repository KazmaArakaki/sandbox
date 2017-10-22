package com.tempura.tempuramusou;

import android.app.Application;

import io.realm.Realm;
import io.realm.RealmConfiguration;

public class TempuraApplication extends Application {
  @Override
  public void onCreate() {
    super.onCreate();

    Realm.init(this);
    Realm.setDefaultConfiguration(
        new RealmConfiguration.Builder().build()
    );
  }
}
