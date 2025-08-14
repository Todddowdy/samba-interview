public with sharing class ExternalServiceHelper {
  public static void updateSObjects(
    Map<Map<String, String>, List<SObject>> map_UnstructuredData
  ) {
    // map to update sObjects by object type
    Map<Schema.sObjectType, List<SObject>> map_UpdateRecords = new Map<Schema.sObjectType, List<SObject>>();

    for (Map<String, String> map_Fields : map_UnstructuredData.keySet()) {
      // list of sObjects
      List<SObject> list_SObjects = map_UnstructuredData.get(map_Fields);
      // Identify sObject type
      Schema.sObjectType objSObjectType = list_SObjects[0].getSObjectType();
      // interate through sObjects
      for (SObject obj : list_SObjects) {
        // interate through field values
        for (String strFieldName : map_Fields.keySet()) {
          // confirm field exists
          Schema.DescribeFieldResult objFieldResult = objSObjectType.getDescribe()
            .fields.getMap()
            .get(strFieldName)
            ?.getDescribe();
          // if field does not exist continue
          if (objFieldResult == null) {
            System.debug(
              strFieldName +
                ' field was skipped because it does not exist in ' +
                objSObjectType +
                ' Schema.'
            );
            continue;
          } else {
            // get field value
            String strFieldValue = map_Fields.get(strFieldName);
            // dynamiclly assign the field values
            obj.put(strFieldName, strFieldValue);
          }
        }
      }

      // Add object type to map
      if (!map_UpdateRecords.containsKey(objSObjectType)) {
        map_UpdateRecords.put(objSObjectType, list_SObjects);
      } else {
        map_UpdateRecords.get(objSObjectType).addAll(list_SObjects);
      }
    }

    if (!map_UpdateRecords.isEmpty()) {
      for (List<SObject> list_SObjectsUpdate : map_UpdateRecords.values()) {
        try {
          update list_SObjectsUpdate;
        } catch (Exception ex) {
          // Normally I would call an exception handler
          System.debug('Exception Error: ' + ex.getMessage());
        }
      }
    }
  }
}
