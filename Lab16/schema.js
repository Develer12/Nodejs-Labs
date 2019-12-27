const {
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema
} = require('graphql');
//DB handler
const Db = require('./db_hand');
const db = new Db();

const FACULTY = new GraphQLObjectType
({
    name: 'FACULTY',
    description: 'FACULTY',
    fields: () =>
    ({
        FACULTY_ID: {type: new GraphQLNonNull(GraphQLString)},
        FACULTY_NAME: {type: new GraphQLNonNull(GraphQLString)}
    })
});

const PULPIT = new GraphQLObjectType
({
    name: 'PULPIT',
    description: 'PULPIT table',
    fields: () =>
    ({
        PULPIT_ID: {type: new GraphQLNonNull(GraphQLString)},
        PULPIT_NAME: {type: new GraphQLNonNull(GraphQLString)},
        FACULTY: {type: GraphQLInt}
    })
});
const SUBJECT = new GraphQLObjectType
({
    name: 'SUBJECT',
    description: 'SUBJECT table',
    fields: () =>
    ({
        SUBJECT_ID: {type: new GraphQLNonNull(GraphQLString)},
        SUBJECT_NAME: {type: new GraphQLNonNull(GraphQLString)},
        PULPIT: {type: GraphQLInt}
    })
});
const TEACHER = new GraphQLObjectType
({
    name: 'TEACHER',
    description: 'TEACHER table',
    fields: () =>
    ({
        TEACHER_ID: {type: new GraphQLNonNull(GraphQLString)},
        TEACHER_NAME: {type: new GraphQLNonNull(GraphQLString)},
        PULPIT: {type: GraphQLString},
    })
});
const AUDITORIUM = new GraphQLObjectType
({
    name: 'AUDITORIUMType',
    description: 'AUDITORIUM Type table',
    fields: () =>
    ({
        AUDITORIUM_ID: {type: new GraphQLNonNull(GraphQLString)},
        AUDITORIUM_NAME: {type: new GraphQLNonNull(GraphQLString)},
        AUDITORIUM_CAPACITY: {type: GraphQLInt},
        AUDITORIUM_TYPE: {type: GraphQLString},
    })
});
const AUDITORIUM_TYPE = new GraphQLObjectType
({
    name: 'AUDITORIUM',
    description: 'AUDITORIUM table',
    fields: () =>
    ({
        AUDITORIUM_TYPE_ID: {type: new GraphQLNonNull(GraphQLString)},
        AUDITORIUM_TYPE_NAME: {type: new GraphQLNonNull(GraphQLString)}
    })
});

const UniversityRoot = new GraphQLObjectType
({
    name: 'UniversityRoot',
    description: 'University Schema',
    fields:
    {
        getFaculties:
        {
            args: {FACULTY: {type: GraphQLString}},
            type: new GraphQLList(FACULTY),
            description: "Faculties List",
            resolve: (root, args) => getRecordsByField('FACULTY', args.FACULTY)
        },
        getPULPITs:
        {
            args: {PULPIT: {type: GraphQLString}},
            type: new GraphQLList(PULPIT),
            description: "List of all PULPITs",
            resolve: (root, args) => getRecordsByField('PULPIT', args.PULPIT)
        },
      getSUBJECTs: {
          args:
          {
              SUBJECT: {type: GraphQLString},
              FACULTY: {type: GraphQLString}
          },
          type: new GraphQLList(SUBJECT),
          description: "List of all SUBJECTs",
          resolve: async (root, args) =>
          {
              const {SUBJECT, FACULTY} = args;
              return FACULTY ?
                  await db.query
                  (
                    `SELECT * FROM SUBJECT s
                        JOIN PULPIT p ON s.PULPIT = p.PULPIT_ID
                        JOIN FACULTY f ON p.FACULTY = f.FACULTY_ID
                        WHERE p.FACULTY = ${FACULTY};`
                  )
                  :
                  await getRecordsByField('SUBJECT', SUBJECT);
          }
      },
      getTEACHERs:
      {
          args:
          {
              TEACHER: {type: GraphQLString},
              FACULTY: {type: GraphQLString}
          },
          type: new GraphQLList(TEACHER),
          description: "List of all TEACHERs",
          resolve: async (root, args) =>
          {
              const {TEACHER, FACULTY} = args;
              return FACULTY ?
                  await db.query
                  (
                      `SELECT * FROM TEACHER t
                              JOIN PULPIT p ON t.PULPIT = p.PULPIT_ID
                              JOIN FACULTY f ON p.FACULTY = f.FACULTY_ID
                              WHERE p.FACULTY = ${FACULTY};`
                  )
                  :
                  await getRecordsByField('TEACHER', TEACHER);
          }
      },
      getAUDITORIUMTypes:
      {
          type: new GraphQLList(AUDITORIUM_TYPE),
          description: "List of all AUDITORIUM types",
          resolve: async () => {return await db.getAll('AUDITORIUM_TYPE');}
      },
      getAUDITORIUMs:
      {
          type: new GraphQLList(AUDITORIUM),
          description: "List of all AUDITORIUMs",
          resolve: async () => {return await db.getAll('AUDITORIUM');}
      },
    }
});

const UniversityMutationRootType = new GraphQLObjectType
({
    name: 'UniversityMutationRoot',
    description: 'University Mutation Schema Query Root',
    fields:
    {
        setFaculty:
        {
            type: FACULTY,
            args:
            {
                facultyId: {type: GraphQLString},
                facultyName: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: (root, args) =>
            {
                let fields = {FACULTY_ID: args.facultyId, FACULTY_NAME: args.facultyName};
                return mutateRecord('FACULTY', fields.FACULTY_ID, fields);
            }
        },
        setPulpit:
        {
            type: PULPIT,
            args:
            {
                pulpitId: {type: GraphQLString},
                pulpitName: {type: new GraphQLNonNull(GraphQLString)},
                facultyId: {type: GraphQLString}
            },
            resolve: async (root, args) =>
            {
                let fields = {PULPIT_ID: args.pulpitId, PULPIT_NAME: args.pulpitName, FACULTY: args.facultyId};
                return mutateRecord('PULPIT', fields.PULPIT_ID, fields);
            }
        },
        setSubject:
        {
            type: SUBJECT,
            args:
            {
                subjectId: {type: GraphQLString},
                subjectName: {type: new GraphQLNonNull(GraphQLString)},
                pulpitId: {type: GraphQLString}
            },
            resolve: async (root, args) =>
            {
                let fields = {SUBJECT_ID: args.subjectId, SUBJECT_NAME: args.subjectName, PULPIT: args.pulpitId};
                return mutateRecord('Subject', fields.SUBJECT_ID, fields);
            }
        },
        setTeacher:
        {
            type: TEACHER,
            args:
            {
                teacherId: {type: GraphQLString},
                teacherName: {type: new GraphQLNonNull(GraphQLString)},
                pulpitId: {type: GraphQLString}
            },
            resolve: async (root, args) =>
            {
                let fields = {TEACHER_ID: args.teacherId, TEACHER_NAME: args.teacherName, PULPIT: args.pulpitId};
                return mutateRecord('TEACHER', fields.TEACHER_ID, fields);
            }
        },

        delFaculty:
        {
            type: FACULTY,
            args: {id: {type: GraphQLString}},
            resolve: (root, args) => deleteRecord('FACULTY', args.id)
        },
        delPulpit:
        {
            type: PULPIT,
            args: {id: {type: GraphQLString}},
            resolve: (root, args) => deleteRecord('PULPIT', args.id)
        },
        delSubject:
        {
            type: SUBJECT,
            args: {id: {type: GraphQLString}},
            resolve: (root, args) => deleteRecord('SUBJECT', args.id)
        },
        delTeacher:
        {
            type: TEACHER,
            args: {id: {type: GraphQLString}},
            resolve: (root, args) => deleteRecord('TEACHER', args.id)
        }
    }
});

const UniversitySchema = new GraphQLSchema
({
    query: UniversityRoot,
    mutation: UniversityMutationRootType
});

async function getRecordsByField(object, field)
{
    const fieldsMap = field;
    let records = [];
    if (field)
      records = await db.GetField(object, fieldsMap);
    else
      records = await db.GetTab(object);
    return records;
}
async function mutateRecord(object, IDField, fields)
{
    return await db.GetField(object, IDField ? IDField : fields)
      .then(async records =>
      {
        let targetRecord = {};
        if (records.length > 0)
        {
          targetRecord = await db.UpdateField(object, fields)
          .then(() => db.GetField(object, fields));
        }
        else
        {
          console.log(fields);
          targetRecord = await db.InsertField(object, fields)
            .then(() => db.GetField(object, fields));
        }
        return targetRecord[0];
      });
}
async function deleteRecord(object, ID)
{
    let recordIDObject = {};
    recordIDObject[object + '_ID'] = ID;
    let targetFACULTY = await db.GetField(object, recordIDObject);
    db.DeleteField(object, ID);
    return targetFACULTY[0];
}


module.exports = UniversitySchema;
