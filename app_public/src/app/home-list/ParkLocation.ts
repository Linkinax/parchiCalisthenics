import { ParseLocation } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

export class ParkLocation {
  _id: string | undefined;

  name!: string;
  distance!: number;
  address: string | undefined;

  rating!: number;
  facilities: string[] | undefined;
}

