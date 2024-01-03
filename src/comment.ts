


const SHEET_NAME_COMMENT = "コメント"
const SHEET_NAME_HISTORY = "編集履歴"
const SHEET_URL = "https://docs.google.com/spreadsheets/d/1RNMe5HfzdxncgOQ91hKjuaNNRsCSCZDSxu8dU5En0wc/edit#gid=0"

export class Comment {
  constructor() {}

  public send(){

    const commentData = this.getCommentData(30)
    const comment = commentData[0]
    // const sss = comment[]
    const homework = comment[13]
    const homeworkToSend = `■宿題 \n ${homework}`
    this.sendLine(homeworkToSend)

  }


  private sendLine(msg){
    var data = {
      "line_groupid": "C48962c8690c96681028900a2348c382e",
      "msg": msg,
    };
  
    var options: { [key: string]: string | boolean} = {
      contentType: "application/json",
      method: "post",
      payload: JSON.stringify(data),
    };
  
    const response = UrlFetchApp.fetch("https://us-central1-mixidea-temp-staging.cloudfunctions.net/sendlineGroupMessage", options);
  

  }

  private getGroupId(): string{



    return ""
  }

  private getCommentData(rowNum: number): any[][]{
    const spreadSheet = SpreadsheetApp.getActiveSpreadsheet()  ||  SpreadsheetApp.openByUrl(SHEET_URL);
    const sheet = spreadSheet.getSheetByName(SHEET_NAME_COMMENT);
    const value =  sheet?.getRange('A30:N30').getValues()
    Logger.log(value)
    return value || [[]]
  }

  private getHomework(): string{
    return ""
  }




}