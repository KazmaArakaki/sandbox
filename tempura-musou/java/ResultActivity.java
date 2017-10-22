package com.tempura.tempuramusou;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ListView;
import android.widget.TextView;

public class ResultActivity extends AppCompatActivity {
  private TempuraUtil.DBManager dbManager;
  private ListView resultList;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_result);

    dbManager = new TempuraUtil.DBManager(this);

    resultList = (ListView) findViewById(R.id.list_result);

    Achievement[] achievements = dbManager.loadAchievementsAll();
    Achievement[] resultAchievements = new Achievement[4 * 2];
    for(int i = 0; i < resultAchievements.length; i++) {
      resultAchievements[i] = achievements[achievements.length - resultAchievements.length + i];
    }

    resultList.setAdapter(new ResultListAdapter(this, resultAchievements));
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();

    dbManager.close();
  }

  private class ResultListAdapter extends BaseAdapter {
    Context context;
    private Achievement[] achievements;

    ResultListAdapter(Context context, Achievement[] achievements) {
      this.context = context;
      this.achievements = achievements;
    }

    @Override
    public int getCount() {
      return achievements.length;
    }

    @Override
    public Object getItem(int position) {
      return achievements[position];
    }

    @Override
    public long getItemId(int position) {
      return position;
    }

    @Override
    public View getView(int position, View view, ViewGroup parent) {
      ViewHolder viewHolder;
      Achievement achievement = (Achievement) getItem(position);

      if(view == null) {
        viewHolder = new ViewHolder();
        view = LayoutInflater.from(parent.getContext()).inflate(
            R.layout.listitem_result, parent, false
        );

        viewHolder.resultText = view.findViewById(R.id.text_result);
        view.setTag(viewHolder);
      }
      else {
        viewHolder = (ViewHolder) view.getTag();
      }

      viewHolder.resultText.setText("" +
          Country.getNameByCode(context, achievement.getCountryCode()) + ": " +
          achievement.getCorrectCount() + " / " + achievement.getQuizCount()
      );

      return view;
    }
  }

  private static class ViewHolder {
    TextView resultText;
  }
}
