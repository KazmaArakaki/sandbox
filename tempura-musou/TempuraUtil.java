package com.tempura.tempuramusou;

import android.util.Log;

import java.util.Arrays;

public class TempuraUtil {
  static int[] getRandomNumbers(int count, int min, int max, boolean unique) {
    int[] numbers = new int[4];

    int i = 0;
    while(i < count) {
      int number = (int) (Math.random() * (max + 1 - min) + min);
      boolean isNumberExistsInNumbers = false;

      for(int n: numbers) {
        if(n == number) {
          isNumberExistsInNumbers = true;
        }
      }

      if(!unique || !isNumberExistsInNumbers) {
        numbers[i] = number;
        i++;
      }
    }

    return numbers;
  }
}
