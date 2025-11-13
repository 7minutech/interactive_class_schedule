SELECT section.instructor, section.start, section.end, section.days,
section.crn, subject.name, course.num, section.section, 
term.name, level.description, course.credits
FROM subject
JOIN course 
ON course.subjectid = subject.id
JOIN level 
ON level.id = course.levelid
JOIN section 
ON section.subjectid = course.subjectid
JOIN term
ON term.id = section.termid
JOIN scheduletype 
ON section.scheduletypeid = scheduletype.id
WHERE subject.id = ? section.in AND course.num = ? AND
section.scheduletypeid = ? AND section.start = ? AND section.end = ? AND DAYS = 

