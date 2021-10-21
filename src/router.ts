import express, { Request, Response } from "express";
import * as PatientService from "./service";
import { Patient } from './interface'

export const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const patient: Patient = await PatientService.getPatientById(id);
    if (patient.first_name !== "" && patient.last_name !== "") {
        res.status(200).send(patient);
    } else {
        res.status(404).send("Patient not found");
    }
});