export interface NotificacaoPropriedades {
    usuarioId: number;
    mensagem: string;
    tipo: 'CONFIRMACAO' | 'REJEICAO' | 'CANCELAMENTO';
    criadoEm?: Date;
}

export class Notificacao {
    private readonly props: NotificacaoPropriedades;

    constructor(props: NotificacaoPropriedades) {
        this.props = {
            ...props,
            criadoEm: props.criadoEm || new Date()
        };
    }

    get usuarioId(): number {
        return this.props.usuarioId;
    }

    get mensagem(): number | string {
        return this.props.mensagem;
    }

    get tipo(): string {
        return this.props.tipo;
    }

    get criadoEm(): Date | undefined {
        return this.props.criadoEm;
    }
}
