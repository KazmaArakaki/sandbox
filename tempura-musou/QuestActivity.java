package com.tempura.tempuramusou;

import android.content.Context;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

public class QuestActivity extends AppCompatActivity {
  private final int TURN_MAX = 5;
  private TextView quizText;
  private ImageView[] quizChoices;

  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_quest);

    quizText = (TextView) findViewById(R.id.text_quiz);
    quizChoices = new ImageView[] {
        (ImageView) findViewById(R.id.image_1),
        (ImageView) findViewById(R.id.image_2),
        (ImageView) findViewById(R.id.image_3),
        (ImageView) findViewById(R.id.image_4)
    };

    new TempuraQuiz(this).start(TURN_MAX);
  }

  private class TempuraQuiz extends TempuraQuizMaster {
    TempuraQuiz(Context context) {
      super(context);
    }

    @Override
    void onInit(Country[] countries) {
      super.onInit(countries);

      for(int i = 0; i < quizChoices.length; i++) {
        quizChoices[i].setTag(R.string.tag_country, countries[i]);
        quizChoices[i].setImageResource(countries[i].getImageResourceId());
      }
    }

    @Override
    void onTurn(int turnCount, String quiz, int answer) {
      super.onTurn(turnCount, quiz, answer);

      quizText.setText(turnCount + ": " + quiz);

      Runnable correctCallback = new Runnable () {
        @Override
        public void run() {
          Toast.makeText(QuestActivity.this, "Good", Toast.LENGTH_SHORT).show();
          next();
        }
      };

      Runnable wrongCallback = new Runnable() {
        @Override
        public void run() {
          Toast.makeText(QuestActivity.this, "Bad", Toast.LENGTH_SHORT).show();
          next();
        }
      };

      for(int i = 0; i < quizChoices.length; i++) {
        quizChoices[i].setOnClickListener(
            new OnImageClickListener(
                answer,
                correctCallback,
                wrongCallback
            )
        );
      }
    }

    @Override
    void onFinish() {
      super.onFinish();

      init();
    }
  }

  private class OnImageClickListener implements View.OnClickListener {
    int answer;
    Runnable correctCallback;
    Runnable wrongCallback;

    OnImageClickListener(int answer, Runnable correctCallback, Runnable wrongCallback) {
      this.answer = answer;
      this.correctCallback = correctCallback;
      this.wrongCallback = wrongCallback;
    }

    @Override
    public void onClick(View view) {
      if(((TempuraQuizMaster.Country) view.getTag(R.string.tag_country)).getId() == answer) {
        correctCallback.run();
      }
      else {
        wrongCallback.run();
      }
    }

    public void setAnswer(int answer) {
      this.answer = answer;
    }
  }
}
