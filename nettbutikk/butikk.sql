CREATE TABLE kunde
(
  kundeid serial primary key,
  fornavn text not null,
  etternavn text NOT NULL,
  adresse text NOT NULL,
  telefon text default '',
  epost text default ''
);

CREATE TABLE bestilling
(
  bestillingid serial primary key,
  betalingsmetode text not null,
  dato DATE NOT NULL,
  betalt boolean default false,
  kundeid INT NOT NULL,
  FOREIGN KEY (kundeid) REFERENCES kunde(kundeid)
);

CREATE TABLE vare
(
  vareid serial primary key,
  varenavn text NOT NULL,
  basispris INT NOT NULL,
  beholdning INT default 0
);

CREATE TABLE linje
(
  linjeid serial primary key,
  pris INT NOT NULL,
  antall INT default 1,
  bestillingid INT NOT NULL,
  vareid INT NOT NULL,
  FOREIGN KEY (bestillingid) REFERENCES bestilling(bestillingid),
  FOREIGN KEY (vareid) REFERENCES vare(vareid)
);