import PDFDocument from "pdfkit";

export default (request, response, next) => {
  response.set("Content-Type", "application/pdf");

  const d = createPDF();
  d.pipe(response);

  registerFonts(d);
  drawResumeFramePaths(d);
  drawResumeFrameTexts(d);

  drawResumeContents(d, request.body);

  d.end();
}

function createPDF() {
  return new PDFDocument({
    "size": [
      1190.55, 841.89
    ],
    "margins": {
      "top": 0,
      "right": 0,
      "bottom": 0,
      "left": 0
    },
    "info": {
      "Title": "履歴書",
      "Author": "ResuBu"
    }
  });
}

function registerFonts(d) {
  d.registerFont("IPA Gothic", __dirname + "/../fonts/ipa_sansserif.ttf");
  d.registerFont("IPA Mincho", __dirname + "/../fonts/ipa_serif.ttf");
}

function drawResumeFramePaths(d) {
  /**
   * Draw base information section
   */
  d.undash();

  d.lineWidth(1.6)
      .path("M40.4,120.4L422.4,120.4M40.4,177.2L422.4,177.2M40.4,205.5L554.9,205.5M40.4,262.2L554.9,262.2M40.4,318.8L554.9,318.8")
      .path("M41.2,120.4L41.2,318.8M421.6,120.4L421.6,205.5M554.1,205.5L554.1,318.8")
      .stroke();

  d.lineWidth(1)
      .path("M320.9,177.2L320.9,205.5M421.6,205.5L421.6,318.8")
      .path("M439.2,92.7L520.6,92.7M439.2,197.4L520.6,197.4")
      .path("M439.6,92.7L439.6,197.4M520.2,92.7L520.2,197.4")
      .stroke();
      
  d.lineWidth(0.4).dash(1.5, {"space": 1})
      .path("M40.8,137.5L422,137.5M40.8,222.5L422,222.5M40.8,279.2L422,279.2")
      .stroke();

  /**
   * Draw history section (left)
   */
  d.undash();

  d.lineWidth(1.6)
      .path("M40.4,352.9L554.9,352.9M40.4,761L554.9,761")
      .path("M41.2,352.9L41.2,761M140.2,352.9L140.2,761M554.1,352.9L554.1,761")
      .stroke();

  d.lineWidth(1)
      .path("M40.4,378.3L554.9,378.3")
      .stroke();

  d.lineWidth(0.8)
      .path("M40.4,403.9L554.9,403.9M40.4,429.4L554.9,429.4M40.4,454.8L554.9,454.8M40.4,480.3L554.9,480.3M40.4,505.9L554.9,505.9M40.4,531.4L554.9,531.4M40.4,557L554.9,557M40.4,582.5L554.9,582.5M40.4,607.9L554.9,607.9M40.4,633.4L554.9,633.4M40.4,658.9L554.9,658.9M40.4,684.4L554.9,684.4M40.4,709.9L554.9,709.9M40.4,735.5L554.9,735.5")
      .stroke();

  d.lineWidth(0.4).dash(1.5, {"space": 1})
      .path("M97.7,352.9L97.7,761")
      .stroke();

  /**
   * Draw history section (right)
   */
  d.undash();

  d.lineWidth(1.6)
      .path("M635.7,43.9L1150.2,43.9M635.7,426.5L1150.2,426.5")
      .path("M636.5,43.9L636.5,426.5M735.5,43.9L735.5,426.5M1149.4,43.9L1149.4,426.5")
      .stroke();

  d.lineWidth(1)
      .path("M635.7,69.5L1150.2,69.5")
      .stroke();

  d.lineWidth(0.8)
      .path("M635.7,94.9L1150.2,94.9M635.7,120.4L1150.2,120.4M635.7,146L1150.2,146M635.7,171.5L1150.2,171.5M635.7,197.1L1150.2,197.1M635.7,222.6L1150.2,222.6M635.7,248L1150.2,248M635.7,273.5L1150.2,273.5M635.7,299L1150.2,299M635.7,324.5L1150.2,324.5M635.7,350L1150.2,350M635.7,375.5L1150.2,375.5M635.7,401.1L1150.2,401.1")
      .stroke();

  d.lineWidth(0.4).dash(1.5, {"space": 1})
      .path("M693,43.9L693,426.5")
      .stroke();

  /**
   * Draw appeal point section
   */
  d.undash();

  d.lineWidth(1.6)
      .path("M635.7,435L1150.2,435M635.7,622.1L1150.2,622.1")
      .path("M636.5,435L636.5,622.1M1149.4,435L1149.4,622.1")
      .stroke();

  d.lineWidth(1)
      .path("M978.4,497.4L1150.2,497.4M978.4,559.7L1150.2,559.7")
      .path("M978.9,435L978.9,622.1M1047.3,559.7L1047.3,622.1")
      .stroke();

  /**
   * Draw desire section
   */
  d.undash();

  d.lineWidth(1.6)
      .path("M635.7,633.3L1150.2,633.3M635.7,761L1150.2,761")
      .path("M636.5,633.3L636.5,761M1149.4,633.3L1149.4,761")
      .stroke();

  d.lineWidth(1)
      .path("M635.7,659L1150.2,659")
      .stroke();

  d.lineWidth(0.8)
      .path("M635.7,684.4L1150.2,684.4M635.7,709.9L1150.2,709.9M635.7,735.4L1150.2,735.4")
      .stroke();
}

function drawResumeFrameTexts(d) {
  /**
   * Draw base information section
   */ 
  d.font("IPA Mincho").fontSize(24)
      .text("履歴書", 48.3, 114 - 24);

  d.font("IPA Mincho").fontSize(10)
      .text("平成", 251.9, 114 - 10)
      .text("年", 301.8, 114 - 10)
      .text("月", 341, 114 - 10)
      .text("日", 380.6, 114 - 10)
      .text("現在", 400.7, 114 - 10)
      .text("写真", 439.6, 150.05 - 10 , {
        "width": 80.6,
        "align": "center"
      });

  d.font("IPA Gothic").fontSize(10)
      .text("ふりがな", 46.2, 133.95 - 10)
      .text("氏名", 46.2, 150.5 - 10)
      .text("年", 121.6, 196.35 - 10)
      .text("月", 161.5, 196.35 - 10)
      .text("日　生", 200.5, 196.35 - 10)
      .text("（満", 249.1, 196.35 - 10)
      .text("歳）", 289.7, 196.35 - 10)
      .text("ふりがな", 46.2, 219 - 10)
      .text("現住所", 46.2, 235.5 - 10)
      .text("電話", 426.6, 219 - 10)
      .text("ふりがな", 46.2, 275.7 - 10)
      .text("連絡先", 46.2, 292.2 - 10)
      .text("電話", 426.6, 275.7 - 10)
      .text("※　男　・　女", 320.9, 196.35 - 10 , {
        "width": 100.7,
        "align": "center"
      });

  /**
   * Draw history section (left)
   */
  d.font("IPA Gothic").fontSize(10)
      .text("年", 41.2, 370.6 - 10 , {
        "width": 56.5,
        "align": "center"
      })
      .text("月", 97.7, 370.6 - 10 , {
        "width": 42.5,
        "align": "center"
      })
      .text("学歴・職歴", 140.2, 370.6 - 10 , {
        "width": 413.9,
        "align": "center"
      });

  /**
   * Draw history section (right)
   */
  d.font("IPA Gothic").fontSize(10)
      .text("年", 636.5, 61.7 - 10 , {
        "width": 56.5,
        "align": "center"
      })
      .text("月", 693, 61.7 - 10 , {
        "width": 42.5,
        "align": "center"
      })
      .text("学歴・職歴", 735.5, 61.7 - 10 , {
        "width": 413.9,
        "align": "center"
      })
      .text("年", 636.5, 265.75 - 10 , {
        "width": 56.5,
        "align": "center"
      })
      .text("月", 693, 265.75 - 10 , {
        "width": 42.5,
        "align": "center"
      })
      .text("免許・資格", 735.5, 265.75 - 10 , {
        "width": 413.9,
        "align": "center"
      });

  /**
   * Draw appeal point section
   */
  d.font("IPA Gothic").fontSize(10)
      .text("志望の動機、特技、好きな学科、アピールポイントなど", 641.5, 450 - 10)
      .text("通勤時間", 978.9, 450 - 10, {
        "width": 170.5,
        "align": "center"
      })
      .text("約", 1002.3, 485 - 10)
      .text("時間", 1041.5, 485 - 10)
      .text("分", 1116.3, 485 - 10)
      .text("扶養家族（配偶者を除く）", 978.9, 512.4 - 10, {
        "width": 170.5,
        "align": "center"
      })
      .text("人", 1116.3, 547.4 - 10)
      .text("配偶者", 978.9, 574.7 - 10, {
        "width": 68.4,
        "align": "center"
      })
      .text("※有・無", 978.9, 609.7 - 10, {
        "width": 68.4,
        "align": "center"
      })
      .text("配偶者の扶養義務", 1047.3, 574.7 - 10, {
        "width": 102.1,
        "align": "center"
      })
      .text("※有・無", 1047.3, 609.7 - 10, {
        "width": 102.1,
        "align": "center"
      });

  /**
   * Draw desire section
   */
  d.font("IPA Gothic").fontSize(10)
      .text("本人希望記入欄", 641.5, 651.15 - 10)
}

function drawResumeContents(d, data) {
  const createDate = new Date();
  d.font("IPA Mincho").fontSize(10)
      .text(convertToJpDate("" + createDate.getFullYear()).year, 271.9, 114 - 10, {
        "width": 29.9,
        "align": "center"
      })
      .text(createDate.getMonth() + 1, 311.8, 114 - 10, {
        "width": 29.2,
        "align": "center"
      })
      .text(createDate.getDate(), 351, 114 - 10, {
        "width": 29.6,
        "align": "center"
      });

  /**
   * Draw Name
   */
  d.font("IPA Gothic").fontSize(10)
      .text(data.name_kana, 100, 133.95 - 10);

  d.font("IPA Gothic").fontSize(20)
      .text(data.name, 100, 167.35 - 20);

  /**
   * Draw birthday
   */
  const birthday = convertToJpDate(data.birthday);

  d.font("IPA Gothic").fontSize(10)
      .text(birthday.year, 81.6, 196.35 - 10, {
        "width": 40,
        "align": "center"
      })
      .text(birthday.month, 131.6, 196.35 - 10, {
        "width": 39.9,
        "align": "center"
      })
      .text(birthday.date, 171.5, 196.35 - 10, {
        "width": 39,
        "align": "center"
      });

  /**
   * Draw age
   */
  d.font("IPA Gothic").fontSize(10)
      .text(data.age, 269.1, 196.35 - 10, {
        "width": 20.6,
        "align": "center"
      });

  /**
   * Draw gender
   */
  d.circle((data.gender == "male"? 361.25: 400.25), 191.35, 8)
      .stroke();

  /**
   * Draw Address
   */
  d.font("IPA Gothic").fontSize(10)
      .text(data.address_1_kana, 100, 219 - 10)
      .text(formatZipcode(data.zipcode), 100, 235.5 - 10)
      .text(data.address_1, 100, 235.5 - 10 + 11)
      .text(data.address_2, 100, 235.5 - 10 + 22);

  if(data.email) {
    d.font("IPA Gothic").fontSize(10)
        .text("Eメール：" + data.email, 41.2, 292.2 - 10 + 16, {
          "width": 380.4,
          "align": "center"
        });
  }
  else {
    d.font("IPA Gothic").fontSize(10)
        .text(data.address_1_kana_optional, 100, 275.7 - 10)
        .text(formatZipcode(data.zipcode_optional), 100, 292.2 - 10)
        .text(data.address_1_optional, 100, 292.2 - 10 + 11)
        .text(data.address_2_optional, 100, 292.2 - 10 + 22);
  }

  /**
   * Draw phone number
   */
  d.font("IPA Gothic").fontSize(10)
      .text(data.phone, 421.6, 238.85 - 10, {
        "width": 132.5,
        "align": "center"
      })
      .text(data.phone_mobile, 421.6, 295.5 - 10, {
        "width": 132.5,
        "align": "center"
      });

  /**
   * Draw histories
   */
  const historyAnchors = getHistoryAnchors();
  const educationHistories = serializeHistories(JSON.parse(data.history_education));
  const workHistories = serializeHistories(JSON.parse(data.history_work));

  const educationHistoryLabelAnchor = historyAnchors.shift();
  d.font("IPA Gothic").fontSize(10)
      .text("学歴", (educationHistoryLabelAnchor.position == "left"? 140.2: 735.5), educationHistoryLabelAnchor.y - 10, {
        "width": 413.9,
        "align": "center"
      });

  (function writeHistory() {
    if(historyAnchors.length == 0 || educationHistories.length == 0) {
      return;
    }

    const anchor = historyAnchors.shift();
    const history = educationHistories.shift();
    const year = convertToJpDate(history.year + "-" +  history.month).year;
    const month = history.month;
    const content = history.history;
    const note = history.note.split("\n");

    d.font("IPA Gothic").fontSize(10)
        .text(year, (anchor.position == "left"? 41.2: 636.5), anchor.y - 10, {
          "width": 56.5,
          "align": "center"
        })
        .text(month, (anchor.position == "left"? 97.7: 693), anchor.y - 10, {
          "width": 42.5,
          "align": "center"
        })
        .text(content, (anchor.position == "left"? 145.2: 740.5), anchor.y - 10);

    (function writeNote() {
      if(historyAnchors.length == 0 || note.length == 0 || note[0].length == 0) {
        return;
      }

      const anchor = historyAnchors.shift();
      const noteRow = note.shift();

      d.font("IPA Gothic").fontSize(10)
          .text(noteRow, (anchor.position == "left"? 155.2: 750.5), anchor.y - 10);

      writeNote();
    })();

    writeHistory();
  })();

  const workHistoryLabelAnchor = historyAnchors.shift();
  d.font("IPA Gothic").fontSize(10)
      .text("職歴", (workHistoryLabelAnchor.position == "left"? 140.2: 735.5), workHistoryLabelAnchor.y - 10, {
        "width": 413.9,
        "align": "center"
      });

  (function writeHistory() {
    if(historyAnchors.length == 0 || workHistories.length == 0) {
      return;
    }

    const anchor = historyAnchors.shift();
    const history = workHistories.shift();
    const year = convertToJpDate(history.year + "-" +  history.month).year;
    const month = history.month;
    const content = history.history;
    const note = history.note.split("\n");

    d.font("IPA Gothic").fontSize(10)
        .text(year, (anchor.position == "left"? 41.2: 636.5), anchor.y - 10, {
          "width": 56.5,
          "align": "center"
        })
        .text(month, (anchor.position == "left"? 97.7: 693), anchor.y - 10, {
          "width": 42.5,
          "align": "center"
        })
        .text(content, (anchor.position == "left"? 145.2: 740.5), anchor.y - 10);

    (function writeNote() {
      if(historyAnchors.length == 0 || note.length == 0 || note[0].length == 0) {
        return;
      }

      const anchor = historyAnchors.shift();
      const noteRow = note.shift();

      d.font("IPA Gothic").fontSize(10)
          .text(noteRow, (anchor.position == "left"? 155.2: 750.5), anchor.y - 10);

      writeNote();
    })();

    writeHistory();
  })();

  /**
   * Draw certification content
   */
  const certificationAnchors = getCertificationAnchors();
  const certifications = serializeHistories(JSON.parse(data.certifications));

  (function writeHistory() {
    if(certificationAnchors.length == 0 || certifications.length == 0) {
      return;
    }

    const anchor = certificationAnchors.shift();
    const certification = certifications.shift();
    const year = convertToJpDate(certification.year + "-" + certification.month).year;
    const month = certification.month;
    const content = certification.history;
    const note = certification.note.split("\n");

    d.font("IPA Gothic").fontSize(10)
        .text(year, (anchor.position == "left"? 41.2: 636.5), anchor.y - 10, {
          "width": 56.5,
          "align": "center"
        })
        .text(month, (anchor.position == "left"? 97.7: 693), anchor.y - 10, {
          "width": 42.5,
          "align": "center"
        })
        .text(content, (anchor.position == "left"? 145.2: 740.5), anchor.y - 10);

    (function writeNote() {
      if(certificationAnchors.length == 0 || note.length == 0 || note[0].length == 0) {
        return;
      }

      const anchor = certificationAnchors.shift();
      const noteRow = note.shift();

      d.font("IPA Gothic").fontSize(10)
          .text(noteRow, (anchor.position == "left"? 155.2: 750.5), anchor.y - 10);

      writeNote();
    })();

    writeHistory();
  })();

  /**
   * Draw appeal point content
   */
  d.font("IPA Gothic").fontSize(10)
      .text(data.appeal, 641.5, 450 + 5, {
        "width": 332.4,
        "height": 167.1
      });

  /**
   * Draw optional information content
   */
  d.font("IPA Gothic").fontSize(10)
      .text(data.commute_hours, 1012.3, 485 - 10, {
        "width": 29.2,
        "align": "center"
      })
      .text(data.commute_minutes, 1061.5, 485 - 10, {
        "width": 54.8,
        "align": "center"
      })
      .text(data.families, 1061.5, 547.4 - 10, {
        "width": 54.8,
        "align": "center"
      });

  d.circle((data.spouce == "y"? 1008.1: 1028.1), 604.7, 8)
      .stroke();

  d.circle((data.obligation == "y"? 1093.35: 1113.35), 604.7, 8)
      .stroke();

  /**
   * Draw desire content
   */
  d.text(data.desire, 641.5, 676.7 - 10, {
    "width": 502.9,
    "height": 94.3,
    "lineGap": 15.5
  });
}

function formatZipcode(zipcode) {
  if(zipcode.indexOf("-") < 0) {
    zipcode = zipcode.replace(/^(\d{3})(\d{4)$/, "$1-$2");
  }

  return "〒 " + zipcode;
}

function convertToJpDate(dateString) {
  let year = Number(dateString.split("-")[0]);
  let month = Number(dateString.split("-")[1]) || 12;
  let date = Number(dateString.split("-")[2]) || 31;

  if(year >= 1990 || (year == 1989 && month >= 1 && date >= 8)) {
    year = "平成" + (year - 1988);
  }
  else {
    year = "昭和" + (year - 1925);
  }

  return {
    "year": year,
    "month": month,
    "date": date
  };
}

function serializeHistories(histories_) {
  const histories = [];

  histories_.forEach(yearHistories => {
    const year = yearHistories.year;

    yearHistories.histories.forEach(monthHistories => {
      const month = monthHistories.month;

      histories.push({
        "year": year,
        "month": month,
        "history": monthHistories.body.history,
        "note": monthHistories.body.note
      });
    });
  });

  return histories;
}

function getHistoryAnchors() {
  return [
    {"position": "left", "y": 396.10},
    {"position": "left", "y": 421.65},
    {"position": "left", "y": 447.10},
    {"position": "left", "y": 472.55},
    {"position": "left", "y": 498.10},
    {"position": "left", "y": 523.65},
    {"position": "left", "y": 549.20},
    {"position": "left", "y": 574.75},
    {"position": "left", "y": 600.20},
    {"position": "left", "y": 625.65},
    {"position": "left", "y": 651.15},
    {"position": "left", "y": 676.65},
    {"position": "left", "y": 702.15},
    {"position": "left", "y": 727.70},
    {"position": "left", "y": 753.25},
    {"position": "right", "y": 61.70},
    {"position": "right", "y": 87.20},
    {"position": "right", "y": 112.65},
    {"position": "right", "y": 138.20},
    {"position": "right", "y": 163.75},
    {"position": "right", "y": 189.30},
    {"position": "right", "y": 214.85},
    {"position": "right", "y": 240.30}
  ];
}

function getCertificationAnchors() {
  return [
    {"y": 291.25},
    {"y": 316.75},
    {"y": 342.25},
    {"y": 367.75},
    {"y": 393.30},
    {"y": 418.80}
  ];
};

