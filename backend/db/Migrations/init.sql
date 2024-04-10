CREATE TABLE Tickets (
	id SERIAL NOT NULL,
    reporterName varchar(255) NOT NULL,
	reporterEmail varchar(255) NOT NULL,
	description varchar(255) NOT NULL,
	status varchar(255) NOT NULL DEFAULT 'new',
    PRIMARY KEY (id)
);