package com.tempura.tempuramusou;

import android.content.Context;
import android.content.Intent;
import android.graphics.Point;
import android.media.Image;
import android.media.MediaPlayer;
import android.provider.MediaStore;
import android.support.constraint.ConstraintLayout;
import android.support.constraint.ConstraintSet;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.HashMap;
import java.util.Map;

import io.realm.Realm;

public class QuizActivity extends AppCompatActivity {
  private TempuraUtil.DBManager dbManager;
  private TextView quizLabel;
  private TextView quizText;
  private ImageView[] quizImages;
  private TextView[] quizImageLabels;
  private MediaPlayer tempuraSound;
  private MediaPlayer gyozaSound;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_quiz);

    quizLabel = (TextView) findViewById(R.id.label_quiz);
    quizText = (TextView) findViewById(R.id.text_quiz);
    quizImages = new ImageView[] {
        (ImageView) findViewById(R.id.image_quiz_1),
        (ImageView) findViewById(R.id.image_quiz_2),
        (ImageView) findViewById(R.id.image_quiz_3),
        (ImageView) findViewById(R.id.image_quiz_4)
    };
    quizImageLabels = new TextView[] {
        (TextView) findViewById(R.id.label_image_quiz_1),
        (TextView) findViewById(R.id.label_image_quiz_2),
        (TextView) findViewById(R.id.label_image_quiz_3),
        (TextView) findViewById(R.id.label_image_quiz_4)
    };

    dbManager = new TempuraUtil.DBManager(this);

    tempuraSound = MediaPlayer.create(this, R.raw.tempura);
    tempuraSound.setLooping(false);
    gyozaSound = MediaPlayer.create(this, R.raw.gyoza);
    gyozaSound.setLooping(false);

    new TempuraQuiz(this).start(5, 2);
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();

    dbManager.close();
  }

  private class TempuraQuiz extends TempuraQuizMaster {
    private Map<String, Integer[]> quizResult = new HashMap<>();

    TempuraQuiz(Context context) {
      super(context);
    }

    @Override
    void onInit(Country[] countries, int turnCountMax, int setCountMax) {
      super.onInit(countries, turnCountMax, setCountMax);

      setImageSize();

      for(int i = 0; i < countries.length; i++) {
        quizImages[i].setImageResource(countries[i].getImageResourceId());
        quizImages[i].setTag(R.string.tag_country, countries[i]);
        quizImageLabels[i].setText(countries[i].getName());

        quizResult.put(countries[i].getCode(), new Integer[] {
            0, 0
        });
      }
    }

    @Override
    void onTurn(final int turnCount, String quiz, int answer) {
      super.onTurn(turnCount, quiz, answer);

      quizLabel.setText("" + turnCount);
      quizText.setText(quiz);

      Callback correctCallback = new Callback() {
        @Override
        void run(final Country country) {
          tempuraSound.seekTo(0);
          tempuraSound.start();

          quizResult.put(country.getCode(), new Integer[] {
              quizResult.get(country.getCode())[0] + 1,
              quizResult.get(country.getCode())[1] + 1
          });

          next();
        }
      };

      Callback wrongCallback = new Callback() {
        @Override
        void run(Country country) {
          gyozaSound.seekTo(0);
          gyozaSound.start();

          quizResult.put(country.getCode(), new Integer[] {
              quizResult.get(country.getCode())[0] + 1,
              quizResult.get(country.getCode())[1]
          });

          next();
        }
      };

      for(ImageView quizImage: quizImages) {
        quizImage.setOnClickListener(new QuizImageClickListener(
            answer,
            correctCallback,
            wrongCallback
        ));
      }
    }

    @Override
    void onFinish() {
      super.onFinish();

      int i = 0;
      Achievement[] achievements = new Achievement[quizResult.size()];
      for(final Map.Entry<String, Integer[]> quizResultEntry: quizResult.entrySet()) {
        achievements[i] = new Achievement();
        achievements[i].setCountryCode(quizResultEntry.getKey());
        achievements[i].setQuizCount(quizResultEntry.getValue()[0]);
        achievements[i].setCorrectCount(quizResultEntry.getValue()[1]);
        i++;
      }

      dbManager.save(achievements);

      Intent intent = new Intent(QuizActivity.this, ResultActivity.class);
      startActivity(intent);
    }
  }

  private void setImageSize() {
    Point displayPoint = new Point();
    this.getWindowManager().getDefaultDisplay().getSize(displayPoint);
    int displayWidth = displayPoint.x;

    for(ImageView quizImage: quizImages) {
      ViewGroup.LayoutParams layoutParams = quizImage.getLayoutParams();

      layoutParams.width = displayWidth / 2 - 12;
      layoutParams.height = displayWidth / 2 - 12;

      quizImage.setLayoutParams(layoutParams);
    }
  }

  private class QuizImageClickListener implements View.OnClickListener {
    int answer;
    Callback correctCallback;
    Callback wrongCallback;

    QuizImageClickListener(int answer, Callback correctCallback, Callback wrongCallback) {
      this.answer = answer;
      this.correctCallback = correctCallback;
      this.wrongCallback = wrongCallback;
    }

    @Override
    public void onClick(View view) {
      Country country = (Country) view.getTag(R.string.tag_country);

      if(answer == country.getId()) {
        correctCallback.run(country);
      }
      else {
        wrongCallback.run(country);
      }
    }
  }

  private abstract class Callback {
    abstract void run(Country country);
  }
}
