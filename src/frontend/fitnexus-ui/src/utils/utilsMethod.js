export const isEmailValid = (email) => {
    const validEmailRegex = /^[-!#$%&'*+0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!email) return false;

    const emailParts = email.split('@');

    if (emailParts.length !== 2) return false;

    const account = emailParts[0];
    const domain = emailParts[1];

    if (account.length > 64) return false;
    else if (domain.length > 255) return false;

    const domainParts = domain.split('.');

    if (domainParts.some((part) => part.length > 63)) return false;

    return validEmailRegex.test(email);
};

export const formatDateToDDMMYYYY = (isoDate) => {
    if (!isoDate) return '';
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
};

export const formatObjetivo = (objetivo) => {
    if (!objetivo) return 'No definido';
    return objetivo
        .toLowerCase()
        .replace('_', ' ')
        .split(' ')
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(' ')
        .replace("Musculo", "Músculo");
};



