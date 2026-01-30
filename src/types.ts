import { HttpHeaders } from "@angular/common/http"

export interface CertificadoRequest {
    cuit: string,
    nroCertificado: string,
    importe: number,
    actoAdministrativo: string
}

export interface CertificadoAltaResponse {
    cuit: string,
    nroCertificado: string, 
    fechaCarga: Date
}