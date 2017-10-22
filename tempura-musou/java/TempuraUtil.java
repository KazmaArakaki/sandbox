package com.tempura.tempuramusou;

import android.content.Context;

import io.realm.Realm;
import io.realm.RealmResults;

public class TempuraUtil {
  static int[] pickRandomUniqueNumbers(int min, int max, int size, int[] excludeNumbers) {
    int[] randomUniqueNumbers = new int[size];

    for(int i = 0; i < randomUniqueNumbers.length; i++) {
      randomUniqueNumbers[i] = -1;
    }

    int i = 0;
    pickRandomUniqueNumbersLoop: while(i < size) {
      int randomNumber = (int) (Math.random() * (max - min) + min);

      for(int excludeNumber: excludeNumbers) {
        if(excludeNumber == randomNumber) {
          continue  pickRandomUniqueNumbersLoop;
        }
      }

      for(int randomUniqueNumber: randomUniqueNumbers) {
        if(randomUniqueNumber == randomNumber) {
          continue pickRandomUniqueNumbersLoop;
        }
      }

      randomUniqueNumbers[i] = randomNumber;
      i++;
    }

    return randomUniqueNumbers;
  }

  static class DBManager {
    private Context context;
    private Realm realm;

    DBManager(Context context) {
      this.context = context;
      this.realm = Realm.getDefaultInstance();
    }

    Achievement[] loadAchievementsAll() {
      RealmResults<Achievement> realmResults = this.realm.where(Achievement.class).findAll();
      Achievement[] achievements = new Achievement[realmResults.size()];

      for(int i = 0; i < achievements.length; i++) {
        achievements[i] = realmResults.get(i);
      }

      return achievements;
    }

    void save(final Achievement[] achievements) {
      this.realm.executeTransaction(new Realm.Transaction() {
        @Override
        public void execute(Realm realm) {
          for(Achievement achievement: achievements) {
            realm.copyToRealm(achievement);
          }
        }
      });
    }

    void close() {
      this.realm.close();
    }
  }
}
