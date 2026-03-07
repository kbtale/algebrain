-- SQLite version of the Algebrain database schema

-- -----------------------------------------------------
-- Table Branches
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Branches (
  BranchID INTEGER PRIMARY KEY AUTOINCREMENT,
  BrName TEXT NOT NULL,
  BrDescription TEXT NOT NULL
);

-- -----------------------------------------------------
-- Table Chapters
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Chapters (
  ChapterID INTEGER PRIMARY KEY AUTOINCREMENT,
  IdBranch INTEGER NOT NULL,
  ChName TEXT NOT NULL,
  ChDescription TEXT,
  FOREIGN KEY (IdBranch) REFERENCES Branches (BranchID) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table Sections
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Sections (
  SectionID INTEGER PRIMARY KEY AUTOINCREMENT,
  IdChapter INTEGER NOT NULL,
  SectName TEXT NOT NULL,
  SectDescription TEXT,
  FOREIGN KEY (IdChapter) REFERENCES Chapters (ChapterID) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table Content
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Content (
  ContentID INTEGER PRIMARY KEY AUTOINCREMENT,
  IdSection INTEGER NOT NULL,
  Content TEXT NOT NULL,
  Content_type_identifier TEXT,
  FOREIGN KEY (IdSection) REFERENCES Sections (SectionID) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table Users
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Users (
  UserID INTEGER PRIMARY KEY AUTOINCREMENT,
  Username TEXT NOT NULL,
  FirstName TEXT NOT NULL,
  LastName TEXT NOT NULL,
  ProfilePic TEXT
);

-- -----------------------------------------------------
-- Table Experiences
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Experiences (
  ExperienceID INTEGER PRIMARY KEY AUTOINCREMENT,
  IdSectionExp INTEGER NOT NULL,
  IdUserExp INTEGER NOT NULL,
  ExpLevel INTEGER,
  FOREIGN KEY (IdSectionExp) REFERENCES Sections (SectionID) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (IdUserExp) REFERENCES Users (UserID) ON DELETE NO ACTION ON UPDATE NO ACTION
);
