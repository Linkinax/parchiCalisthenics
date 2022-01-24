import { Component, OnInit } from '@angular/core';

export class Location {
  _id: String | undefined;

  name: String | undefined;
  distance!: number;
  address: String | undefined;

  rating!: number;
  facilities: string[] | undefined;
}
