import { v1 as uuidv1 } from 'uuid';
import { GenerateFinalQueries } from '../FinalQueries/GenerateFinalQueries';

export function GenerateCompleteData(queryType, tablename, email) {

  let inputData = JSON.parse(localStorage.getItem('myData'));
  let lrsData = JSON.parse(localStorage.getItem('lrsData'));
  localStorage.setItem('queryType', queryType.selectedOption);

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var hr = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  if (hr < 10) {
    hr = '0' + hr;
  }
  if (min < 10) {
    min = '0' + min;
  }
  if (sec < 10) {
    sec = '0' + sec;
  }
  let dtfrmt = 'yyyy-mm-dd hh24:mi:ss';
  let dt = yyyy + '-' + mm + '-' + dd + ' ' + hr + ':' + min + ':' + sec;
  let bg_DT = yyyy + '-' + mm + '-' + dd;
  let bg_frmt = 'yyyy-mm-dd';
  let completeData = [];
  let lrsAtrtributeData = [];
  let linkAttributeData = [];
  var obj = {};
  let defaultTextData = {};
  let defaultAssetData = {};
  let defaultLinkData = {};
  let defaultLRSatrributes = {};
  let default_LINK_ATTRIBUTE = {};
  let asset_groupID = '';
  let Sequence_num = 0;
  if (queryType.selectedOption === 'Insert') {
    if (tablename.includes('TX')) {
      defaultTextData = {
        TX_ID: 'id',
        END_DT: "TO_DATE('2299-12-31','yyyy-mm-dd')",
        TX_NM: 'name',
        LCLE_CD: 'en_US',
        TX_VL: 'value',
        BEG_DT: "TO_DATE('2022-07-18','yyyy-mm-dd')",
        TX_DSC: 'description',
        VRSN_NR: 0,
        CRT_DT: "TO_DATE('2022-07-18 13:17:45','yyyy-mm-dd hh24:mi:ss')",
        CRT_BY: 'email',
        LST_UPD_BY: 'email',
        LST_UPD_DT: "TO_DATE('2022-07-18 13:17:45','yyyy-mm-dd hh24:mi:ss')",
        IS_OVRD: 1,
        IS_NDS_MR_INFO: 0,
        IS_REUSABLE: 1,
        IS_CLNT_FACE: 0,
      };
      generateInsertData(defaultTextData);
    } else if (tablename.includes('ASSET')) {
      defaultAssetData = {
        ID: '56b4c7f1-333b-211f-ae6b-5eee5187f3',
        SEQUENCE: 1,
        HTMLMARKUP: null,
        NAME: 'name',
        DESCRIPTION: 'description',
        ASSETTYPE: 'text',
        ASSETKEY: 'value',
        EXPRESSIONKEY: null,
        ASSETGROUP_ID: '56b4c7f1-333b-211f-ae6b-5eee5187f3',
        HTML_BEG_TAG_TX: null,
        HTML_END_TAG_TX: null,
        IS_CUST_TAG: 0,
        IS_EXPR_CNFG: 0,
        IS_REPT: 0,
        IS_BASE_CNFG: 0,
      };
      asset_groupID = localStorage.getItem('asset_groupID');
      Sequence_num = parseInt(localStorage.getItem('Sequence_Num'));
      generateInsertData(defaultAssetData);
    } else {
      defaultLinkData = {
        LINK_ID: 'id',
        END_DT: "TO_DATE('2299-12-31','yyyy-mm-dd')",
        BEG_DT: "TO_DATE('2022-07-18','yyyy-mm-dd')",
        VRSN_NR: 0,
        DESC_TX: 'description',
        USE_DYNAMICS_DATA: 0,
        LINK_INTN_ID: 'Link name',
        TEXT_KEY: 'Text key',
        LINK_NAME: 'Link name',
        LINK_TYPE_INTN_ID: 'secondaryWithScroll',
        IS_LINK_DISABLE_EXPRESSION: null,
        IS_OVRD: 1,
        IS_NDS_MR_INFO: 0,
        CRT_DT: "TO_DATE('2022-07-18 13:17:45','yyyy-mm-dd hh24:mi:ss')",
        CRT_BY: 'mail',
        LST_UPD_BY: 'mail',
        LST_UPD_DT: "TO_DATE('2022-07-18 13:17:45','yyyy-mm-dd hh24:mi:ss')",
        SRVC_NM: 'CM',
        IS_CLNT_FACE: 0,
        THRD_PRTY_TX_KEY: null,
        TITL_TX_KY: null,
        DOMAIN: 'Ben-HM',
      };
      defaultLRSatrributes = {
        ATTRIBUTE_ID: 'id',
        ATTRIBUTE_NAME: 'absoluteUrl',
        VRSN_NR: 0,
        ATTRIBUTE_VALUE: 'url',
        END_DT: "TO_DATE('2299-12-31','yyyy-mm-dd')",
        BEG_DT: "TO_DATE('2022-07-18','yyyy-mm-dd')",
        DESC_TX: null,
        MODULE_ID: 'CORE_LRS_LINK',
      };
      default_LINK_ATTRIBUTE = {
        LINK_ID: 'id',
        ATTRIBUTE_SQ: 1,
        ATTRIBUTE_ID: 'atr_id',
      };
      generateInsertData(defaultLinkData);
      generateLRSData(defaultLRSatrributes);
      generateLinkAtrributeData(default_LINK_ATTRIBUTE);
    }
  } else {
    generateUpdateData();
  }
  //data for insert queries
  function generateInsertData(defaultData) {
    console.log("Default data"+JSON.stringify(defaultData));
    let columnNames = Object.keys(defaultData);
    let defaultValues = Object.values(defaultData);
    let col_num = 1;
    for (let i = 0; i < inputData.length; i++) {
      const element = inputData[i];
      obj['ITEM_NUM'] = col_num++;
      for (let index = 0; index < columnNames.length; index++) {
        let colname = columnNames[index];
        if (!element[colname]) {
          if (colname === 'ASSETGROUP_ID') {
            obj[colname] = asset_groupID;
          } else if (colname === 'SEQUENCE') {
            Sequence_num = Sequence_num + 1;
            obj[colname] = Sequence_num;
          } else if (colname.includes('ID')) {
            obj[colname] = uuidv1();
          } else if (colname === 'CRT_DT' || colname === 'LST_UPD_DT') {
            obj[colname] = "TO_DATE('" + dt + "','" + dtfrmt + "')";
          } else if (colname === 'BEG_DT') {
            obj[colname] = "TO_DATE('" + bg_DT + "','" + bg_frmt + "')";
          } else if (colname.includes('BY')) {
            obj[colname] = email;
          } else if (defaultValues[index] === null) {
            obj[colname] = 'null';
          } else {
            obj['LST_UPD_DT'] = "TO_DATE('" + dt + "','" + dtfrmt + "')";
            obj['LST_UPD_BY'] = email;
            obj[colname] = defaultValues[index];
          }
        } else {
          if (colname === 'NAME' || colname === 'TX_NM') {
            obj[colname] = element[colname].replaceAll(' ', '');
          } else if (typeof element[colname] === 'string') {
            obj[colname] = element[colname].trim();
          } else {
            obj[colname] = element[colname];
          }
        }
      }
      completeData.push(obj);
      obj = {};
    }
    console.log("Complete data"+JSON.stringify(completeData));
  }

  //data for LRS attributes table for type of update in LINK
  function generateLRSData(defaultData) {
    let columnNames = Object.keys(defaultData);
    let defaultValues = Object.values(defaultData);
    let col_num = 1;

    for (let i = 0; i < lrsData.length; i++) {
      const element = lrsData[i];

      obj['ITEM_NUM'] = col_num++;
      for (let index = 0; index < columnNames.length; index++) {
        let colname = columnNames[index];
        if (!element[colname]) {
          if (colname.includes('ID')) {
            obj[colname] = uuidv1();
          } else if (colname === 'CRT_DT' || colname === 'LST_UPD_DT') {
            obj[colname] = "TO_DATE('" + dt + "','" + dtfrmt + "')";
          } else if (colname === 'BEG_DT') {
            obj[colname] = "TO_DATE('" + bg_DT + "','" + bg_frmt + "')";
          } else if (defaultValues[index] === null) {
            obj[colname] = 'null';
          } else {
            obj[colname] = defaultValues[index];
          }
        } else {
          obj[colname] = element[colname];
        }
      }
      lrsAtrtributeData.push(obj);
      obj = {};
    }
    localStorage.setItem(
      'lrsAtrtributeData',
      JSON.stringify(lrsAtrtributeData)
    );
  }
  //data for linkAttributeData for type of update is link
  function generateLinkAtrributeData(defaultData) {
    let data = {};
    let col_num = 1;
    for (let i = 0; i < inputData.length; i++) {
      const cdata = completeData[i];
      const lrsdata = lrsAtrtributeData[i];
      data['ITEM_NUM'] = col_num++;
      data['LINK_ID'] = cdata['LINK_ID'];
      data['ATTRIBUTE_SQ'] = defaultData['ATTRIBUTE_SQ'];
      data['ATTRIBUTE_ID'] = lrsdata['ATTRIBUTE_ID'];
      linkAttributeData.push(data);
      data = {};
    }

    localStorage.setItem(
      'linkAttributeData',
      JSON.stringify(linkAttributeData)
    );
  }

  //data for update queries
  function generateUpdateData() {
    asset_groupID = localStorage.getItem('asset_groupID');
    let columnNames = [];
    let col_num = 1;
    for (let i = 0; i < inputData.length; i++) {
      const element = inputData[i];
      columnNames = Object.keys(element);
      obj['ITEM_NUM'] = col_num++;
      for (let index = 0; index < columnNames.length; index++) {
        let colname = columnNames[index];
        if (!element[colname]) {
          if (colname === 'ASSETGROUP_ID') {
            obj[colname] = asset_groupID;
          } else if (colname === 'LCLE_CD') {
            obj[colname] = 'en_US';
          } else {
            obj['LST_UPD_DT'] = "TO_DATE('" + dt + "','" + dtfrmt + "')";
            obj['LST_UPD_BY'] = email;
          }
        } else {
          if (colname === 'NAME' || colname === 'TX_NM') {
            obj[colname] = element[colname].replaceAll(' ', '');
          } else if (typeof element[colname] === 'string') {
            obj[colname] = element[colname].trim();
          } else {
            obj[colname] = element[colname];
          }
        }
      }
      completeData.push(obj);
      obj = {};
    }
  }
  if (tablename.selectedOption === 'TEXT') {
    completeData = completeData.filter(
      (res) => !(res.TX_VL.includes("'") || res.TX_DSC.includes("'"))
    );
  } else if (tablename.selectedOption === 'ASSET') {
    completeData = completeData.filter(
      (res) => !(res.DESCRIPTION.includes("'") || res.ASSETKEY.includes("'"))
    );
  }
  if (completeData == null || !completeData) {
    return (
      <div>
        <h1>No Data generated</h1>
      </div>
    );
  } else {
    localStorage.setItem('CompleteData', JSON.stringify(completeData));
    GenerateFinalQueries(queryType, tablename);
  }
}
