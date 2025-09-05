export const typedefs = `#graphql


type User {
    id: String!
    name: String!
    email: String!
    profileImg: String!
}
type Lecture {
    id: String!
    title: String!
    description: String!
    duration: Int!
    src: String
    sectionID: String!
}
type Section{
    id: String!
    title: String!
    lectures: [Lecture]
}

type Course { 
    id: String!
    title: String!
    description: String!
    category: String!
    thumbnail: String
    lastUpdate: String!
    price: Int!
    status: String!
    instructorId: String!
    instructor: User
    sections: [Section]
}

type ThumbnailUploadUrl{
    courseid: String!
    url: String
}
type UploadFiles {
    Sections:[SectionsUpload]
}

type SectionsUpload{
    sectionId:String!
    Lectures:  [LectureUpload]
}
type LectureUpload{
    lectureId: String!
    url: String
}

input CourseInput{
    id: String!
    title: String!
    description: String!
    category: String!
    thumbnail: Boolean!
    price: Int!
}

input LectureInput {
    id: String!
    title: String!
    description: String!
    duration: Int!
    upload:Boolean!
}
input SectionInput{
    id: String!
    title: String!
    lectures: [LectureInput!]!
}
input SectionsInput{
    sections: [SectionInput!]!
    courseId: String!
}

type Query{
    courses: [Course]
    course(id:String!): Course
}

type Mutation{
    updateCourseBasicInfo(data:CourseInput!): ThumbnailUploadUrl
    updateSections(data:SectionsInput!):UploadFiles
}
`;
