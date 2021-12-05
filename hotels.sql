CREATE DATABASE hotelbooking

create schema hotelbooking;
set schema 'hotelbooking';

--if recreating the database, need to drop tables in this order to avoid constraint violations
--drop table roombooking;
--drop table booking;
--drop table customer;
--drop table room;
--drop table rates;

create table customer (
	c_no integer unique not null,
	c_name varchar(80) not null,
	c_email varchar(60) not null,
	c_address varchar(200) not null,
	c_cardtype varchar(2),
	check (c_cardtype in ('V', 'MC', 'A')),
	c_cardexp varchar(5),
	c_cardno varchar(16),
	primary key (c_no)
);

create table room (
	r_no integer unique not null,
	r_class char(5) not null,
	check (r_class in ('std_d', 'std_t', 'sup_d', 'sup_t')),
	r_status char(1) default 'A',
	check (r_status in ('O', 'C', 'A', 'X')),
	r_notes varchar(300),
	primary key (r_no)
);

create table rates (
	r_class char(5),
	price decimal(6,2)
);

create table booking (
	b_ref serial unique not null,
	c_no integer references customer,
	b_cost decimal(6,2),
	b_outstanding decimal(6,2),
	b_notes varchar(300),
	primary key (b_ref)
);

create table roombooking (
	r_no integer references room,
	b_ref integer references booking,
	checkin date not null,
	checkout date not null,
	primary key (r_no, b_ref)
);


insert into room values (101, 'sup_d', 'A', '');
insert into room values (102, 'sup_d', 'A', '');
insert into room values (103, 'std_d', 'A', '');
insert into room values (104, 'std_d', 'A', '');
insert into room values (105, 'std_d', 'A', '');
insert into room values (106, 'std_t', 'A', '');
insert into room values (107, 'std_t', 'A', '');
insert into room values (108, 'std_t', 'A', '');
insert into room values (201, 'sup_d', 'A', '');
insert into room values (202, 'sup_d', 'A', '');
insert into room values (203, 'sup_d', 'A', '');
insert into room values (204, 'std_t', 'A', '');
insert into room values (205, 'std_t', 'A', '');
insert into room values (206, 'std_t', 'A', '');
insert into room values (207, 'std_t', 'A', '');
insert into room values (208, 'sup_t', 'A', '');
insert into room values (209, 'sup_t', 'A', '');
insert into room values (210, 'sup_t', 'A', '');
insert into room values (211, 'std_d', 'A', '');
insert into room values (212, 'std_d', 'A', '');
insert into room values (301, 'std_d', 'A', '');
insert into room values (302, 'std_d', 'A', '');
insert into room values (303, 'sup_d', 'A', '');
insert into room values (304, 'sup_d', 'A', '');
insert into room values (305, 'sup_d', 'A', '');
insert into room values (306, 'sup_d', 'A', '');
insert into room values (307, 'sup_t', 'A', '');
insert into room values (308, 'sup_t', 'A', '');
insert into room values (309, 'sup_t', 'A', '');
insert into room values (310, 'sup_t', 'A', '');
insert into room values (311, 'sup_t', 'A', '');
insert into room values (312, 'sup_t', 'A', '');

insert into rates values ('std_t', 62);
insert into rates values ('std_d', 65);
insert into rates values ('sup_t', 75);
insert into rates values ('sup_d', 77);

insert into customer values (12008, 'Ann Hinchcliffe', 'Ann.Hinchcliffe@yahoo.com', '81 New Road, Acle NR13 7GH', 'V', '10/24', '8948106927123585');
insert into customer values (12036, 'Carol Pearson', 'Carol.Pearson@gmail.com', '40 St Mark''s Road, London E23 5LW', 'V', '09/25', '9183767246807868');
insert into customer values (12037, 'Cherrill Fisher', 'Cherrill.Fisher@yahoo.com', '14 Bernard Road, Norwich NR6 7LL', 'MC', '05/24', '5491775659602051');
insert into customer values (12090, 'Cherry Smith', 'Cherry.Smith@yahoo.com', '15 The Hurst, Birmingham B17 5AH', 'V', '08/24', '5055718166088399');
insert into customer values (12098, 'Chris Holmes', 'Chris.Holmes@gmail.com', '65 Sandridge Road St Albans AL1 8YH', 'MC', '08/24', '3758532795729252');
insert into customer values (12128, 'Craig Naylor', 'Craig.Naylor@yahoo.com', '15 Park Street, London NW5 3RG', 'MC', '02/24', '7897976289709324');
insert into customer values (12146, 'Danny Keenan', 'Danny.Keenan@gmail.com', '8 Clifford Street York Y2 7JV', 'V', '05/25', '3296158946356776');
insert into customer values (12147, 'Daphne Mann', 'Daphne.Mann@yahoo.com', '10 Victoria Street, Norwich NR1 7RD', 'V', '05/24', '3041722074855055');
insert into customer values (12175, 'Darren Lee', 'Darren.Lee@gmail.com', '40 Helena Road, Diss IP22 8UK', 'A', '01/24', '3206315976614144');
insert into customer values (12186, 'Debbie Davison', 'Debbie.Davison@yahoo.com', '65 Windsor Road, Reading RG2 8AX', 'MC', '08/24', '9313717884645601');
insert into customer values (12193, 'Deborah Herring', 'Deborah.Herring@gmail.com', '5 Peascod Street, Sheffield S5 8HB', 'MC', '11/24', '4595864641759032');
insert into customer values (12194, 'Denis Gower', 'Denise.Gower@gmail.com', '5 Alma Road, Kings Lynn PE30 2 FN', 'V', '09/25', '3258301785786885');
insert into customer values (12205, 'Denise Follows', 'Denise.Follows@gmail.com', '15 Frogmore Park, London NW4 3AQ', 'V', '02/25', '9124628930869373');
insert into customer values (12218, 'Denise Hunt', 'Denise.Hunt@yahoo.com', '5 Spinners Walk, Ipswich IP1 3JN', 'MC', '04/25', '7824605040712906');
insert into customer values (12284, 'Dominic Earl', 'Dominic.Earl@yahoo.com', '15 Bexley Street, Diss IP22 2ES', 'MC', '05/24', '9771589265721184');
insert into customer values (12298, 'Emma Seager', 'Emma.Seager@gmail.com', '80 Devereux Road, Holt NR25 3EE', 'V', '11/25', '2571819110792660');
insert into customer values (12401, 'Ian Haden', 'Ian.Haden@yahoo.com', '10 Frogmore, Bristol BS16 4AF', 'MC', '11/24', '3656758666526411');
insert into customer values (12404, 'Jennifer Gray', 'Jennifer.Gray@yahoo.com', '10 Bexley Terrace, Great Yarmouth NR30 5TZ', 'V', '11/24', '7660503113099615');
insert into customer values (12425, 'Jodie Anderson', 'Jodie.Anderson@yahoo.com', '5 Bridgewater Terrace, Little Melton NR18 4JB', 'MC', '04/25', '9093490787439584');
insert into customer values (12433, 'Joe Page', 'Joe.Page@yahoo.com', '5 Spinners Walk, London N17 2GC', 'A', '04/24', '1231336923428654');
insert into customer values (12454, 'Joe Prentice', 'Joe.Prentice@yahoo.com', '40 Helena Road, Aylsham NR11 2YB', 'MC', '02/24', '1608794797959268');
insert into customer values (12473, 'John Jones', 'John.Jones@yahoo.com', '5 Dorset Road, Wymondham NR18 6QT', 'V', '12/25', '1956167460056484');
insert into customer values (12489, 'John Moore', 'John.Moore@yahoo.com', '65 Arthur Road, Diss IP22 7YH', 'V', '04/24', '1460998871211523');
insert into customer values (12528, 'Jolanta Balaz', 'Jolanta.Balaz@gmail.com', '25 Bachelors'' Acre, Cromer NR27 9JY', 'V', '09/24', '9645108040255342');
insert into customer values (12538, 'Joseph Zafor Kahn', 'Joseph.ZaforKahn@gmail.com', '15 Park Avenue, Norwich NR7 1BL', 'MC', '07/24', '9263423347679293');
insert into customer values (12563, 'Keith Roberts', 'Keith.Roberts@yahoo.com', '105 Oxford Road, Hethersett NR18 7UX', 'V', '08/24', '8451200084036386');
insert into customer values (12570, 'Linda Satt', 'Linda.Satt@gmail.com', '5 Thames Side, Reading RG4 8KE', 'MC', '12/24', '3002553128235845');
insert into customer values (12573, 'Linda Smith', 'Linda.Smith@gmail.com', '65 Barton Lodge Road, Birmingham B12 1KC', 'MC', '06/24', '4316155679735479');
insert into customer values (12576, 'Maria Deacon', 'Maria.Deacon@yahoo.com', '20 Clewer Hill Road, Great Yarmouth NR30 2EV', 'MC', '10/24', '9377665278133681');
insert into customer values (12596, 'Mathew Ireland', 'Mathew.Ireland@yahoo.com', '5 Love Lane, Ipswich IP1 4ED', 'V', '6/24', '5350948440312389');
insert into customer values (12669, 'Michael Harrison', 'Michael.Harrison@yahoo.com', '5 Spinners Walk, Aylsham NR11 5TD', 'MC', '03/24', '1361876228505197');
insert into customer values (12684, 'Michelle Stafford', 'Michelle.Stafford@gmail.com', '15 Home Park, Hethersett NR18 0RH', 'A', '06/25', '4447915332882744');
insert into customer values (12717, 'Monica Steele', 'Monica.Steele@yahoo.com', '135 Grove Road, Norwich NR3 5LB', 'V', '01/24', '1284850699045096');
insert into customer values (12718, 'Nancy Chizarura', 'Nancy.Chizarura@gmail.com', '25 St Leonard''s Road, Norwich NR2 2AX', 'V', '08/24', '3217358417874174');
insert into customer values (12723, 'Nigel Ainley', 'Nigel.Ainley@yahoo.com', '60 Temple Road, Peterborough PE4 8QT', 'MC', '04/25', '6538837920765282');
insert into customer values (12745, 'Phillip Taylor', 'Phillip.Taylor@yahoo.com', '40 Helena Road, Holt NR25 3AZ', 'V', '02/24', '3659676257717685');
insert into customer values (12752, 'Rob Thompson', 'Rob.Thompson@gmail.com', '10 Spencergate York Y2 1SL', 'MC', '06/24', '4155755838256510');
insert into customer values (12790, 'Sally Rodgers', 'Sally.Rodgers@yahoo.com', '28 St Anne''s Road, London SE23 1FT', 'V', '10/24', '6453483470978788');
insert into customer values (12801, 'Sheila Reynolds', 'Sheila.Reynolds@yahoo.com', '25 Laundry Loke, North Walsham NR28 0DK', 'V', '03/24', '6842481611086565');
insert into customer values (12818, 'Stuart Reed', 'Stuart.Reed@yahoo.com', '170 New Road, Kings Lynn PE30 0UJ', 'A', '12/24', '6621132418881361');
insert into customer values (12874, 'Sue Gray', 'Sue.Gray@yahoo.com', '20 Albert Street, Ipswich IP2 3AX', 'V', '08/24', '8947579422735172');
insert into customer values (12908, 'Sue Green', 'Sue.Green@yahoo.com', '40 Helena Road, Cromer NR27 6TH', 'MC', '05/24', '6781813175933739');
insert into customer values (12920, 'Susan Connolly', 'Susan.Connolly@gmail.com', '65 Victoria Road, Wymondham NR18 3RG', 'MC', '10/24', '9956366620035307');
insert into customer values (12931, 'Vanessa Burns', 'Vanessa.Burns@yahoo.com', '60 Temple Road, Norwich NR7 8QT', 'A', '11/24', '7422266817013766');
insert into customer values (12932, 'Zoe Smallbone', 'Zoe.Smallbone@yahoo.com', '5 Lime Tree Avenue, Hethersett NR18 1FK', 'V', '06/24', '8703274271879718');
insert into customer values (12953, 'Andrew Spalding', 'Andrew.Spalding@yahoo.com', '30 Castle Precincts, Acle NR13 2AY', 'V', '12/24', '6101225280422702');


insert into booking values (13011, 12146, 0, 0, '');
insert into booking values (13052, 12205, 0, 0, '');
insert into booking values (13066, 12931, 0, 0, '');
insert into booking values (13083, 12790, 0, 0, '');
insert into booking values (13098, 12920, 0, 0, '');
insert into booking values (13109, 12528, 0, 0, '');
insert into booking values (13138, 12298, 0, 0, '');
insert into booking values (13168, 12401, 0, 0, '');
insert into booking values (13180, 12284, 0, 0, '');
insert into booking values (13202, 12528, 0, 0, '');
insert into booking values (13220, 12284, 0, 0, '');
insert into booking values (13246, 12146, 0, 0, '');
insert into booking values (13250, 12036, 0, 0, '');
insert into booking values (13262, 12745, 0, 0, '');
insert into booking values (13324, 12563, 0, 0, '');
insert into booking values (13325, 12576, 0, 0, '');
insert into booking values (13332, 12573, 0, 0, '');
insert into booking values (13339, 12528, 0, 0, '');
insert into booking values (13358, 12576, 0, 0, '');
insert into booking values (13385, 12454, 0, 0, '');
insert into booking values (13421, 12473, 0, 0, '');
insert into booking values (13425, 12932, 0, 0, '');
insert into booking values (13429, 12284, 0, 0, '');
insert into booking values (13476, 12146, 0, 0, '');
insert into booking values (13482, 12573, 0, 0, '');
insert into booking values (13503, 12473, 0, 0, '');
insert into booking values (13505, 12818, 0, 0, '');
insert into booking values (13541, 12473, 0, 0, '');
insert into booking values (13559, 12205, 0, 0, '');
insert into booking values (13585, 12401, 0, 0, '');
insert into booking values (13602, 12205, 0, 0, '');
insert into booking values (13627, 12404, 0, 0, '');
insert into booking values (13631, 12454, 0, 0, '');
insert into booking values (13663, 12036, 0, 0, '');
insert into booking values (13801, 12473, 0, 0, '');
insert into booking values (13836, 12953, 0, 0, '');
insert into booking values (13853, 12205, 0, 0, '');
insert into booking values (13872, 12146, 0, 0, '');
insert into booking values (13881, 12008, 0, 0, '');
insert into booking values (13886, 12723, 0, 0, '');
insert into booking values (13893, 12874, 0, 0, '');
insert into booking values (13906, 12745, 0, 0, '');
insert into booking values (13925, 12669, 0, 0, '');
insert into booking values (13970, 12576, 0, 0, '');
insert into booking values (13977, 12718, 0, 0, '');
insert into booking values (14038, 12801, 0, 0, '');
insert into booking values (14074, 12908, 0, 0, '');
insert into booking values (14101, 12473, 0, 0, '');
insert into booking values (14154, 12718, 0, 0, '');
insert into booking values (14172, 12790, 0, 0, '');
insert into booking values (14184, 12684, 0, 0, '');
insert into booking values (14239, 12146, 0, 0, '');
insert into booking values (14276, 12790, 0, 0, '');
insert into booking values (14277, 12037, 0, 0, '');
insert into booking values (14301, 12790, 0, 0, '');
insert into booking values (14400, 12717, 0, 0, '');
insert into booking values (14403, 12953, 0, 0, '');
insert into booking values (14446, 12454, 0, 0, '');
insert into booking values (14460, 12931, 0, 0, '');
insert into booking values (14507, 12298, 0, 0, '');
insert into booking values (14593, 12563, 0, 0, '');
insert into booking values (14633, 12008, 0, 0, '');
insert into booking values (14671, 12717, 0, 0, '');
insert into booking values (14679, 12284, 0, 0, '');
insert into booking values (14690, 12818, 0, 0, '');
insert into booking values (14705, 12205, 0, 0, '');
insert into booking values (14797, 12538, 0, 0, '');
insert into booking values (14844, 12801, 0, 0, '');
insert into booking values (14853, 12528, 0, 0, '');
insert into booking values (14855, 12146, 0, 0, '');
insert into booking values (14930, 12098, 0, 0, '');
insert into booking values (14963, 12684, 0, 0, '');
insert into booking values (14971, 12175, 0, 0, '');
insert into booking values (15091, 12433, 0, 0, '');
insert into booking values (15142, 12790, 0, 0, '');
insert into booking values (15150, 12723, 0, 0, '');
insert into booking values (15160, 12953, 0, 0, '');
insert into booking values (15242, 12931, 0, 0, '');
insert into booking values (15246, 12098, 0, 0, '');
insert into booking values (15258, 12596, 0, 0, '');
insert into booking values (15286, 12576, 0, 0, '');
insert into booking values (15301, 12790, 0, 0, '');
insert into booking values (15318, 12008, 0, 0, '');
insert into booking values (15349, 12684, 0, 0, '');
insert into booking values (15367, 12146, 0, 0, '');
insert into booking values (15410, 12186, 0, 0, '');
insert into booking values (15446, 12752, 0, 0, '');
insert into booking values (15489, 12920, 0, 0, '');
insert into booking values (15500, 12008, 0, 0, '');
insert into booking values (15539, 12669, 0, 0, '');
insert into booking values (15543, 12790, 0, 0, '');
insert into booking values (15565, 12175, 0, 0, '');
insert into booking values (15566, 12175, 0, 0, '');
insert into booking values (15656, 12573, 0, 0, '');
insert into booking values (15731, 12037, 0, 0, '');
insert into booking values (15735, 12723, 0, 0, '');
insert into booking values (15801, 12128, 0, 0, '');
insert into booking values (15822, 12205, 0, 0, '');
insert into booking values (15934, 12037, 0, 0, '');
insert into booking values (15960, 12175, 0, 0, '');
insert into booking values (15975, 12596, 0, 0, '');

update booking set b_cost=130.00 where b_ref=13011;
update booking set b_cost=308.00 where b_ref=13052;
update booking set b_cost=770.00 where b_ref=13066;
update booking set b_cost=556.00 where b_ref=13083;
update booking set b_cost=636.00 where b_ref=13098;
update booking set b_cost=186.00 where b_ref=13109;
update booking set b_cost=186.00 where b_ref=13138;
update booking set b_cost=548.00 where b_ref=13168;
update booking set b_cost=300.00 where b_ref=13180;
update booking set b_cost=608.00 where b_ref=13202;
update booking set b_cost=408.00 where b_ref=13220;
update booking set b_cost=62.00 where b_ref=13246;
update booking set b_cost=308.00 where b_ref=13250;
update booking set b_cost=408.00 where b_ref=13262;
update booking set b_cost=65.00 where b_ref=13324;
update booking set b_cost=496.00 where b_ref=13325;
update booking set b_cost=231.00 where b_ref=13332;
update booking set b_cost=195.00 where b_ref=13339;
update booking set b_cost=325.00 where b_ref=13358;
update booking set b_cost=65.00 where b_ref=13385;
update booking set b_cost=150.00 where b_ref=13421;
update booking set b_cost=225.00 where b_ref=13425;
update booking set b_cost=308.00 where b_ref=13429;
update booking set b_cost=308.00 where b_ref=13476;
update booking set b_cost=195.00 where b_ref=13482;
update booking set b_cost=420.00 where b_ref=13503;
update booking set b_cost=434.00 where b_ref=13505;
update booking set b_cost=381.00 where b_ref=13541;
update booking set b_cost=260.00 where b_ref=13559;
update booking set b_cost=195.00 where b_ref=13585;
update booking set b_cost=154.00 where b_ref=13602;
update booking set b_cost=687.00 where b_ref=13627;
update booking set b_cost=195.00 where b_ref=13631;
update booking set b_cost=300.00 where b_ref=13663;
update booking set b_cost=186.00 where b_ref=13801;
update booking set b_cost=231.00 where b_ref=13836;
update booking set b_cost=139.00 where b_ref=13853;
update booking set b_cost=612.00 where b_ref=13872;
update booking set b_cost=137.00 where b_ref=13881;
update booking set b_cost=568.00 where b_ref=13886;
update booking set b_cost=65.00 where b_ref=13893;
update booking set b_cost=77.00 where b_ref=13906;
update booking set b_cost=150.00 where b_ref=13925;
update booking set b_cost=248.00 where b_ref=13970;
update booking set b_cost=140.00 where b_ref=13977;
update booking set b_cost=1085.00 where b_ref=14038;
update booking set b_cost=214.00 where b_ref=14074;
update booking set b_cost=608.00 where b_ref=14101;
update booking set b_cost=142.00 where b_ref=14154;
update booking set b_cost=152.00 where b_ref=14172;
update booking set b_cost=608.00 where b_ref=14184;
update booking set b_cost=154.00 where b_ref=14239;
update booking set b_cost=65.00 where b_ref=14276;
update booking set b_cost=154.00 where b_ref=14277;
update booking set b_cost=186.00 where b_ref=14301;
update booking set b_cost=300.00 where b_ref=14400;
update booking set b_cost=280.00 where b_ref=14403;
update booking set b_cost=154.00 where b_ref=14446;
update booking set b_cost=608.00 where b_ref=14460;
update booking set b_cost=75.00 where b_ref=14507;
update booking set b_cost=848.00 where b_ref=14593;
update booking set b_cost=300.00 where b_ref=14633;
update booking set b_cost=150.00 where b_ref=14671;
update booking set b_cost=137.00 where b_ref=14679;
update booking set b_cost=548.00 where b_ref=14690;
update booking set b_cost=308.00 where b_ref=14705;
update booking set b_cost=816.00 where b_ref=14797;
update booking set b_cost=576.00 where b_ref=14844;
update booking set b_cost=62.00 where b_ref=14853;
update booking set b_cost=616.00 where b_ref=14855;
update booking set b_cost=456.00 where b_ref=14930;
update booking set b_cost=248.00 where b_ref=14963;
update booking set b_cost=225.00 where b_ref=14971;
update booking set b_cost=62.00 where b_ref=15091;
update booking set b_cost=254.00 where b_ref=15142;
update booking set b_cost=248.00 where b_ref=15150;
update booking set b_cost=199.00 where b_ref=15160;
update booking set b_cost=62.00 where b_ref=15242;
update booking set b_cost=260.00 where b_ref=15246;
update booking set b_cost=225.00 where b_ref=15258;
update booking set b_cost=548.00 where b_ref=15286;
update booking set b_cost=77.00 where b_ref=15301;
update booking set b_cost=231.00 where b_ref=15318;
update booking set b_cost=274.00 where b_ref=15349;
update booking set b_cost=411.00 where b_ref=15367;
update booking set b_cost=75.00 where b_ref=15410;
update booking set b_cost=201.00 where b_ref=15446;
update booking set b_cost=648.00 where b_ref=15489;
update booking set b_cost=248.00 where b_ref=15500;
update booking set b_cost=77.00 where b_ref=15539;
update booking set b_cost=75.00 where b_ref=15543;
update booking set b_cost=248.00 where b_ref=15565;
update booking set b_cost=186.00 where b_ref=15566;
update booking set b_cost=225.00 where b_ref=15656;
update booking set b_cost=606.00 where b_ref=15731;
update booking set b_cost=426.00 where b_ref=15735;
update booking set b_cost=124.00 where b_ref=15801;
update booking set b_cost=231.00 where b_ref=15822;
update booking set b_cost=124.00 where b_ref=15934;
update booking set b_cost=556.00 where b_ref=15960;
update booking set b_cost=186.00 where b_ref=15975;
 
update booking set b_outstanding = b_cost;

insert into roombooking values (101, 13505, '29Jan2022', '31Jan2022');
insert into roombooking values (101, 14101, '18Nov2021', '22Nov2021');
insert into roombooking values (101, 15489, '01Feb2022', '04Feb2022');
insert into roombooking values (102, 13083, '29Dec2021', '02Jan2022');
insert into roombooking values (102, 13872, '23Jan2022', '26Jan2022');
insert into roombooking values (102, 13906, '03Feb2022', '04Feb2022');
insert into roombooking values (102, 14038, '18Jan2022', '23Jan2022');
insert into roombooking values (102, 14172, '04Feb2022', '05Feb2022');
insert into roombooking values (103, 13220, '09Jan2022', '11Jan2022');
insert into roombooking values (103, 13262, '31Dec2021', '02Jan2022');
insert into roombooking values (103, 13339, '22Dec2021', '25Dec2021');
insert into roombooking values (103, 13385, '12Jan2022', '13Jan2022');
insert into roombooking values (104, 13585, '14Dec2021', '17Dec2021');
insert into roombooking values (104, 13631, '13Nov2021', '16Nov2021');
insert into roombooking values (104, 14276, '17Oct2021', '18Oct2021');
insert into roombooking values (104, 15142, '19Nov2021', '21Nov2021');
insert into roombooking values (105, 13358, '24Dec2021', '29Dec2021');
insert into roombooking values (105, 13559, '19Dec2021', '23Dec2021');
insert into roombooking values (105, 13872, '23Jan2022', '26Jan2022');
insert into roombooking values (105, 13977, '30Jan2022', '31Jan2022');
insert into roombooking values (106, 13872, '23Jan2022', '26Jan2022');
insert into roombooking values (106, 14074, '28Oct2021', '29Oct2021');
insert into roombooking values (106, 14797, '14Jan2022', '18Jan2022');
insert into roombooking values (106, 15934, '26Oct2021', '28Oct2021');
insert into roombooking values (107, 13098, '26Dec2021', '29Dec2021');
insert into roombooking values (107, 14844, '10Oct2021', '13Oct2021');
insert into roombooking values (107, 15150, '08Nov2021', '12Nov2021');
insert into roombooking values (107, 15242, '26Jan2022', '27Jan2022');
insert into roombooking values (108, 13325, '03Jan2022', '07Jan2022');
insert into roombooking values (108, 13881, '15Jan2022', '16Jan2022');
insert into roombooking values (108, 15446, '21Dec2021', '22Dec2021');
insert into roombooking values (108, 15566, '30Dec2021', '02Jan2022');
insert into roombooking values (108, 15960, '05Dec2021', '09Dec2021');
insert into roombooking values (201, 13052, '24Nov2021', '28Nov2021');
insert into roombooking values (201, 13066, '30Dec2021', '04Jan2022');
insert into roombooking values (201, 13220, '09Jan2022', '11Jan2022');
insert into roombooking values (201, 13853, '05Feb2022', '06Feb2022');
insert into roombooking values (201, 14277, '17Oct2021', '19Oct2021');
insert into roombooking values (201, 14446, '12Nov2021', '14Nov2021');
insert into roombooking values (201, 14460, '27Oct2021', '31Oct2021');
insert into roombooking values (201, 14705, '26Dec2021', '30Dec2021');
insert into roombooking values (202, 13250, '31Oct2021', '04Nov2021');
insert into roombooking values (202, 13627, '17Dec2021', '20Dec2021');
insert into roombooking values (202, 13886, '10Nov2021', '14Nov2021');
insert into roombooking values (202, 14239, '28Nov2021', '30Nov2021');
insert into roombooking values (202, 14855, '18Oct2021', '22Oct2021');
insert into roombooking values (202, 15735, '02Dec2021', '05Dec2021');
insert into roombooking values (203, 13602, '26Dec2021', '28Dec2021');
insert into roombooking values (203, 14074, '28Oct2021', '29Oct2021');
insert into roombooking values (203, 14184, '11Jan2022', '15Jan2022');
insert into roombooking values (203, 14930, '13Dec2021', '16Dec2021');
insert into roombooking values (203, 15960, '05Dec2021', '09Dec2021');
insert into roombooking values (204, 13109, '05Nov2021', '08Nov2021');
insert into roombooking values (204, 13801, '13Dec2021', '16Dec2021');
insert into roombooking values (204, 14301, '02Feb2022', '05Feb2022');
insert into roombooking values (204, 14853, '17Dec2021', '18Dec2021');
insert into roombooking values (204, 15367, '06Oct2021', '09Oct2021');
insert into roombooking values (204, 15446, '21Dec2021', '22Dec2021');
insert into roombooking values (204, 15500, '18Oct2021', '22Oct2021');
insert into roombooking values (204, 15975, '09Oct2021', '12Oct2021');
insert into roombooking values (205, 13083, '29Dec2021', '02Jan2022');
insert into roombooking values (205, 13138, '25Oct2021', '28Oct2021');
insert into roombooking values (205, 13168, '14Oct2021', '18Oct2021');
insert into roombooking values (205, 13325, '03Jan2022', '07Jan2022');
insert into roombooking values (205, 13853, '05Feb2022', '06Feb2022');
insert into roombooking values (205, 14679, '23Oct2021', '24Oct2021');
insert into roombooking values (205, 14690, '19Oct2021', '23Oct2021');
insert into roombooking values (205, 15160, '07Jan2022', '08Jan2022');
insert into roombooking values (206, 13262, '31Dec2021', '02Jan2022');
insert into roombooking values (206, 14593, '10Dec2021', '14Dec2021');
insert into roombooking values (206, 14963, '18Oct2021', '22Oct2021');
insert into roombooking values (206, 15091, '14Nov2021', '15Nov2021');
insert into roombooking values (206, 15142, '19Nov2021', '21Nov2021');
insert into roombooking values (206, 15286, '03Jan2022', '07Jan2022');
insert into roombooking values (206, 15489, '01Feb2022', '04Feb2022');
insert into roombooking values (206, 15565, '27Nov2021', '01Dec2021');
insert into roombooking values (207, 13220, '09Jan2022', '11Jan2022');
insert into roombooking values (207, 13246, '29Dec2021', '30Dec2021');
insert into roombooking values (207, 13541, '28Jan2022', '31Jan2022');
insert into roombooking values (207, 13970, '30Oct2021', '03Nov2021');
insert into roombooking values (207, 15160, '07Jan2022', '08Jan2022');
insert into roombooking values (207, 15349, '30Nov2021', '02Dec2021');
insert into roombooking values (207, 15731, '09Dec2021', '12Dec2021');
insert into roombooking values (207, 15801, '08Nov2021', '10Nov2021');
insert into roombooking values (208, 13098, '26Dec2021', '29Dec2021');
insert into roombooking values (208, 13663, '21Nov2021', '25Nov2021');
insert into roombooking values (208, 14633, '29Jan2022', '31Jan2022');
insert into roombooking values (208, 14679, '23Oct2021', '24Oct2021');
insert into roombooking values (208, 15258, '27Nov2021', '30Nov2021');
insert into roombooking values (208, 15656, '08Dec2021', '11Dec2021');
insert into roombooking values (209, 13098, '26Dec2021', '29Dec2021');
insert into roombooking values (209, 13925, '11Nov2021', '13Nov2021');
insert into roombooking values (209, 14460, '27Oct2021', '31Oct2021');
insert into roombooking values (209, 14971, '07Nov2021', '10Nov2021');
insert into roombooking values (210, 13180, '08Nov2021', '12Nov2021');
insert into roombooking values (210, 13421, '09Oct2021', '11Oct2021');
insert into roombooking values (210, 13627, '17Dec2021', '20Dec2021');
insert into roombooking values (210, 14038, '18Jan2022', '23Jan2022');
insert into roombooking values (210, 14507, '27Jan2022', '28Jan2022');
insert into roombooking values (210, 14593, '10Dec2021', '14Dec2021');
insert into roombooking values (210, 15543, '05Feb2022', '06Feb2022');
insert into roombooking values (211, 13893, '19Jan2022', '20Jan2022');
insert into roombooking values (211, 14844, '10Oct2021', '13Oct2021');
insert into roombooking values (212, 13503, '29Dec2021', '01Jan2022');
insert into roombooking values (212, 13886, '10Nov2021', '14Nov2021');
insert into roombooking values (212, 14038, '18Jan2022', '23Jan2022');
insert into roombooking values (212, 14403, '21Nov2021', '23Nov2021');
insert into roombooking values (301, 13324, '22Dec2021', '23Dec2021');
insert into roombooking values (301, 13482, '04Nov2021', '07Nov2021');
insert into roombooking values (301, 13541, '28Jan2022', '31Jan2022');
insert into roombooking values (301, 14154, '26Nov2021', '27Nov2021');
insert into roombooking values (301, 14797, '14Jan2022', '18Jan2022');
insert into roombooking values (301, 14844, '10Oct2021', '13Oct2021');
insert into roombooking values (301, 15246, '30Oct2021', '03Nov2021');
insert into roombooking values (301, 15731, '09Dec2021', '12Dec2021');
insert into roombooking values (302, 13011, '02Feb2022', '04Feb2022');
insert into roombooking values (302, 13505, '29Jan2022', '31Jan2022');
insert into roombooking values (302, 15735, '02Dec2021', '05Dec2021');
insert into roombooking values (303, 13202, '13Oct2021', '17Oct2021');
insert into roombooking values (303, 13262, '31Dec2021', '02Jan2022');
insert into roombooking values (303, 14797, '14Jan2022', '18Jan2022');
insert into roombooking values (303, 15301, '25Nov2021', '26Nov2021');
insert into roombooking values (303, 15539, '10Dec2021', '11Dec2021');
insert into roombooking values (304, 13066, '30Dec2021', '04Jan2022');
insert into roombooking values (304, 13332, '11Jan2022', '14Jan2022');
insert into roombooking values (304, 14855, '18Oct2021', '22Oct2021');
insert into roombooking values (304, 15318, '22Jan2022', '25Jan2022');
insert into roombooking values (305, 13836, '13Oct2021', '16Oct2021');
insert into roombooking values (305, 14154, '26Nov2021', '27Nov2021');
insert into roombooking values (305, 15489, '01Feb2022', '04Feb2022');
insert into roombooking values (305, 15822, '03Dec2021', '06Dec2021');
insert into roombooking values (306, 13429, '13Jan2022', '17Jan2022');
insert into roombooking values (306, 13476, '20Oct2021', '24Oct2021');
insert into roombooking values (306, 13627, '17Dec2021', '20Dec2021');
insert into roombooking values (306, 15446, '21Dec2021', '22Dec2021');
insert into roombooking values (307, 13503, '29Dec2021', '01Jan2022');
insert into roombooking values (307, 14690, '19Oct2021', '23Oct2021');
insert into roombooking values (307, 15286, '03Jan2022', '07Jan2022');
insert into roombooking values (307, 15367, '06Oct2021', '09Oct2021');
insert into roombooking values (308, 13168, '14Oct2021', '18Oct2021');
insert into roombooking values (308, 13202, '13Oct2021', '17Oct2021');
insert into roombooking values (308, 13425, '23Dec2021', '26Dec2021');
insert into roombooking values (308, 14101, '18Nov2021', '22Nov2021');
insert into roombooking values (308, 14400, '24Jan2022', '28Jan2022');
insert into roombooking values (308, 14593, '10Dec2021', '14Dec2021');
insert into roombooking values (308, 14633, '29Jan2022', '31Jan2022');
insert into roombooking values (308, 15349, '30Nov2021', '02Dec2021');
insert into roombooking values (309, 13881, '15Jan2022', '16Jan2022');
insert into roombooking values (309, 13977, '30Jan2022', '31Jan2022');
insert into roombooking values (309, 14074, '28Oct2021', '29Oct2021');
insert into roombooking values (309, 14403, '21Nov2021', '23Nov2021');
insert into roombooking values (309, 14930, '13Dec2021', '16Dec2021');
insert into roombooking values (310, 14671, '24Dec2021', '26Dec2021');
insert into roombooking values (310, 15160, '07Jan2022', '08Jan2022');
insert into roombooking values (311, 13505, '29Jan2022', '31Jan2022');
insert into roombooking values (311, 14172, '04Feb2022', '05Feb2022');
insert into roombooking values (311, 14184, '11Jan2022', '15Jan2022');
insert into roombooking values (311, 15410, '21Jan2022', '22Jan2022');
insert into roombooking values (311, 15731, '09Dec2021', '12Dec2021');

update booking set b_outstanding=0 where b_ref in (
select b.b_ref from booking b, roombooking rb 
where b.b_ref=rb.b_ref and rb.checkout < '16Oct2021');

--- end of database setup ---

--- useful queries ---

--1 booking costs room-by-room breakdown
select b.b_ref, rt.price, rb.checkout-rb.checkin as noofnights, rb.r_no, rt.price*(rb.checkout-rb.checkin) as cost
from booking b, rates rt, roombooking rb, room rm
where b.b_ref=rb.b_ref
and rb.r_no=rm.r_no
and rm.r_class=rt.r_class
and b.b_ref = XXXXX; -- booking ref to be inserted


--2 booking costs in a single query
select b.b_ref, (rb.checkout-rb.checkin) as noofnights, count(rb.r_no) as noofrooms, sum(rt.price*(rb.checkout-rb.checkin)) as total
from booking b, rates rt, roombooking rb, room rm
where b.b_ref=rb.b_ref
and rb.r_no=rm.r_no
and rm.r_class=rt.r_class
and b.b_ref = XXXXX -- booking ref to be inserted
group by b.b_ref, noofnights;


