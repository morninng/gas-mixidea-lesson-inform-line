type OnEditEvent = GoogleAppsScript.Events.SheetsOnEdit;

const SHEET_NAME_COMMENT = "コメント"
const SHEET_NAME_HISTORY = "編集履歴"

interface UserLogData {
  email,
  row,
  column,
}

export class History{

  constructor(){}

  private getHistoryData(e: OnEditEvent): UserLogData | null{
    if(SHEET_NAME_COMMENT !== e?.source?.getSheetName()){
      return null;
    }
    const email = e.user.getEmail()
    const column = e.range.getColumn()
    const row = e.range.getRow()

    return {email, row, column}
  }

  public push(e: OnEditEvent){
    const data = this.getHistoryData(e)
    if(!data){
      return;
    }
    this.addOneLine(e, data)
  }

  private addOneLine(e, data: UserLogData){
    const sheet = e.source.getSheetByName(SHEET_NAME_HISTORY);
    sheet.insertRowBefore(2)
    const now = new Date();
    const options: { [key: string]: string} = {
      dateStyle: 'full',
      timeStyle: "long",
      timeZone: 'Asia/Tokyo' 
    };

    const formatter = new Intl.DateTimeFormat('ja-JP', options);
    const formattedDate = formatter.format(now);
    const newData = [ formattedDate , data.email, data.row, data.column ]; 
     sheet.getRange('A2:D2').setValues([newData]);
  }



  public getLastEditedRow(){
    const spreadSheet = SpreadsheetApp.getActiveSpreadsheet()
    const sheet = spreadSheet.getSheetByName(SHEET_NAME_HISTORY);
    return sheet?.getRange('C2').getValue()
  }


}
